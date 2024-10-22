import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Orders } from 'src/Entities/Orders.entity';
import { Repository } from 'typeorm';
import { CreateOrderDTO, UpdateOrderDTO } from '../DTO/Order.dto';
import { User } from 'src/Entities/user.entity';
import { PaymentMethod } from 'src/Entities/paymentMethod.entity';
import { Franchises } from 'src/Entities/franchises.entity';
import { CartItems } from 'src/Entities/cartItems.entity';

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
      relations: ['user', 'payment_method', 'managed_by', 'franchise'],
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
      where: { user: { id: user_id } },
      relations: ['product'],
    });

    if (cartItems.length === 0) {
      throw new BadRequestException('Giỏ hàng trống, không thể tạo đơn hàng.');
    }

    // Tính tổng giá trị đơn hàng
    const totalAmount = cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0,
    );

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
    await this.cartItemsRepository.delete({ user: { id: user_id } }); // Xóa các mặt hàng trong giỏ hàng

    return order;
  }
}
