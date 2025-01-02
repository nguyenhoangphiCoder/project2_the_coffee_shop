import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Orders } from 'src/Entities/Orders.entity';
import { In, Repository } from 'typeorm';
import { CreateOrderDTO, UpdateOrderDTO } from '../DTO/Order.dto';
import { User } from 'src/Entities/user.entity';
import { PaymentMethod } from 'src/Entities/paymentMethod.entity';
import { Franchises } from 'src/Entities/franchises.entity';
import { CartItems } from 'src/Entities/cartItems.entity';
import * as nodemailer from 'nodemailer';
import { ProductSize } from 'src/Entities/productSize.entity';
@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Orders)
    private readonly orderRepository: Repository<Orders>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(PaymentMethod)
    private readonly paymentMethodRepository: Repository<PaymentMethod>,
    @InjectRepository(Franchises)
    private readonly franchiseRepository: Repository<Franchises>,
    @InjectRepository(CartItems)
    private readonly cartItemsRepository: Repository<CartItems>,
    @InjectRepository(ProductSize)
    private readonly productSizeRepository: Repository<ProductSize>,
  ) {}

  // Tạo đơn hàng mới
  async create(CreateOrderDTO: CreateOrderDTO): Promise<Orders> {
    const user = await this.userRepository.findOne({
      where: { id: CreateOrderDTO.user_id },
    });
    const paymentMethod = await this.paymentMethodRepository.findOne({
      where: { payment_method_id: CreateOrderDTO.payment_method_id },
    });
    const managedBy = await this.userRepository.findOne({
      where: { id: CreateOrderDTO.managed_by },
    });
    const franchise = await this.franchiseRepository.findOne({
      where: { id: CreateOrderDTO.franchise_id },
    });

    if (!user || !paymentMethod || !managedBy || !franchise) {
      throw new BadRequestException(
        'Không tìm thấy thông tin cần thiết để tạo đơn hàng.',
      );
    }

    const order = this.orderRepository.create({
      ...CreateOrderDTO,
      user,
      payment_method: paymentMethod,
      managed_by: managedBy,
      franchise,
    });
    return this.orderRepository.save(order);
  }

  // Liệt kê tất cả đơn hàng
  async findAll(): Promise<Orders[]> {
    return this.orderRepository.find({
      relations: [
        'user',
        'payment_method',
        'managed_by',
        'franchise',
        'orderItems',
      ],
    });
  }

  // Tìm kiếm đơn hàng theo id
  async findOne(id: number): Promise<Orders> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['user', 'payment_method', 'managed_by', 'franchise'],
    });
    if (!order) {
      throw new NotFoundException('Không tìm thấy đơn hàng.');
    }
    return order;
  }

  // Cập nhật đơn hàng
  async update(id: number, updateOrderDTO: UpdateOrderDTO): Promise<Orders> {
    const order = await this.findOne(id);
    Object.assign(order, updateOrderDTO);
    return this.orderRepository.save(order);
  }

  // Xóa đơn hàng
  async remove(id: number): Promise<void> {
    const order = await this.findOne(id);
    await this.orderRepository.remove(order);
  }

  // Tạo đơn hàng từ giỏ hàng
  async createOrderFromCart(
    user_id: number,
    payment_method_id: number,
    franchise_id: number,
  ): Promise<Orders> {
    const cartItems = await this.cartItemsRepository.find({
      where: { cart: { id: user_id } },
      relations: ['product'],
    });

    if (cartItems.length === 0) {
      throw new BadRequestException('Giỏ hàng trống, không thể tạo đơn hàng.');
    }

    const user = await this.userRepository.findOne({ where: { id: user_id } });
    const paymentMethod = await this.paymentMethodRepository.findOne({
      where: { payment_method_id: payment_method_id },
    });
    const franchise = await this.franchiseRepository.findOne({
      where: { id: franchise_id },
    });

    if (!user || !paymentMethod || !franchise) {
      throw new BadRequestException(
        'Thông tin cần thiết không đầy đủ để tạo đơn hàng.',
      );
    }

    const order = this.orderRepository.create({
      user,
      payment_method: paymentMethod,
      franchise,
      buyer_name: user.name, // Giả định rằng người dùng có trường name
      buyer_phone: user.phone_number, // Giả định rằng người dùng có trường phone
      buyer_email: user.email, // Giả định rằng người dùng có trường email
      status: 'pending',
    });

    await this.orderRepository.save(order);
    await this.cartItemsRepository.delete({ cart: { id: user_id } }); // Xóa các mặt hàng trong giỏ hàng

    return order;
  }
  async removeAll(): Promise<void> {
    // Lấy tất cả ID từ bảng order_items
    const allItems = await this.orderRepository.find();

    // Kiểm tra xem có item nào để xóa không
    if (allItems.length === 0) {
      throw new NotFoundException('No items found to delete');
    }

    // Tạo mảng các ID của item
    const itemIds = allItems.map((item) => item.id);

    // Xóa các item với ID hợp lệ
    const result = await this.orderRepository.delete(itemIds);

    if (result.affected === 0) {
      throw new NotFoundException('No items found to delete');
    }
  }

  async findOrdersByUserId(user_id: number): Promise<Orders[]> {
    const orders = await this.orderRepository.find({
      where: { user: { id: user_id } },
      relations: ['user', 'payment_method'],
    });

    if (!orders || orders.length === 0) {
      throw new NotFoundException(
        'Không tìm thấy đơn hàng cho người dùng này.',
      );
    }

    return orders;
  }

  async sendInvoiceToEmail(userEmail: string): Promise<string> {
    // Tìm người dùng dựa trên email
    const user = await this.userRepository.findOne({
      where: { email: userEmail },
      relations: ['orders'],
    });

    if (!user) {
      throw new NotFoundException('Không tìm thấy người dùng với email này.');
    }

    // Lấy danh sách hóa đơn của người dùng
    const orders = await this.orderRepository.find({
      where: { user: { id: user.id }, invoice_sent: false }, // Chỉ lấy các hóa đơn chưa gửi
      relations: ['orderItems', 'orderItems.product'],
    });

    if (orders.length === 0) {
      throw new NotFoundException(
        'Người dùng này không có hóa đơn nào chưa được gửi.',
      );
    }

    // Tạo nội dung hóa đơn
    const invoiceContent = await Promise.all(
      orders.map(async (order) => {
        // Lấy chi tiết các sản phẩm với kích thước
        const orderDetails = await Promise.all(
          order.orderItems.map(async (item) => {
            // Lấy giá điều chỉnh theo kích thước từ bảng `product_sizes`
            const productSize = await this.productSizeRepository.findOne({
              where: {
                products: { id: item.product.id },
                size: item.size,
              },
            });

            // Kiểm tra xem giá điều chỉnh có hợp lệ không
            const adjustedPrice = Math.round(item.price); // Đảm bảo không phải NaN

            console.log(
              `$adjustedPrice: ${adjustedPrice}, $item.quantity: ${item.quantity}`,
            );

            return `- ${item.product.name} (${item.size}) x${item.quantity}: ${adjustedPrice} $`;
          }),
        );

        // Tính tổng tiền của đơn hàng
        const totalAmount = order.orderItems.reduce((total, item) => {
          const adjustedPrice = Math.round(item.price);
          // Giá sản phẩm đã được điều chỉnh
          const quantity = item.quantity; // Số lượng sản phẩm

          console.log(
            `Adjusted Price: ${adjustedPrice}, Quantity: ${quantity}`,
          );
          return total + adjustedPrice; // Nhân giá với số lượng
        }, 0);

        console.log('Total Amount:', totalAmount);

        return `
          Hóa đơn ID: ${order.id}
          Ngày tạo: ${order.created_at}
          Chi tiết sản phẩm:
          ${orderDetails.join('\n')}
          Tổng cộng: ${totalAmount} $
        `;
      }),
    );

    const emailContent = `
      <h3>Hóa đơn của bạn</h3>
      <p>Cảm ơn bạn đã mua hàng tại The Tech Coffee.</p>
      <p>Dưới đây là thông tin hóa đơn của bạn:</p>
      <pre>${invoiceContent.join('\n')}</pre>
    `;

    // Gửi email
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'nguyenhoangphifpt523@gmail.com',
        pass: 'uwgk izeo shuw siru',
      },
    });

    const mailOptions = {
      from: '"The Tech Coffee" <your-email@gmail.com>',
      to: userEmail, // Chỉ gửi email cho người dùng duy nhất
      subject: 'Hóa đơn mua hàng từ The Tech Coffee',
      html: emailContent,
    };

    try {
      await transporter.sendMail(mailOptions);

      // Cập nhật trạng thái gửi hóa đơn
      await this.orderRepository.update(
        { id: In(orders.map((order) => order.id)) }, // Cập nhật cho tất cả hóa đơn đã gửi
        { invoice_sent: true },
      );

      return 'Hóa đơn đã được gửi đến email của bạn.';
    } catch (error) {
      console.error('Error sending email:', error);
      throw new BadRequestException('Không thể gửi email hóa đơn.');
    }
  }
}
