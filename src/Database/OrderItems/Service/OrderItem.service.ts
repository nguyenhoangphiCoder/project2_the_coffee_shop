import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderDTO } from 'src/Database/Orders/DTO/Order.dto';
import { OrderItems } from 'src/Entities/orderItems.entity';
import { Repository } from 'typeorm';
import { CreateOrderItemDTO, UpdateOrderItemsDTO } from '../DTO/OrderItem.dto';
import { Orders } from 'src/Entities/Orders.entity';
import { Product } from 'src/Entities/Product.entity';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(OrderItems)
    private readonly OrderItemRepository: Repository<OrderItems>,

    @InjectRepository(Orders)
    private readonly orderRepository: Repository<Orders>,

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}
  //tao don hang moi
  async create(createOrderItemDTO: CreateOrderItemDTO): Promise<OrderItems> {
    // Tìm Order và Product dựa trên ID
    const order = await this.orderRepository.findOne({
      where: { id: createOrderItemDTO.order_id },
    });
    const product = await this.productRepository.findOne({
      where: { id: createOrderItemDTO.product_id },
    });

    // Kiểm tra tồn tại
    if (!order || !product) {
      throw new NotFoundException('Order or Product not found');
    }

    // Tạo đối tượng OrderItem từ DTO
    const orderItem = this.OrderItemRepository.create({
      ...createOrderItemDTO,
      order: order,
      product: product,
    });

    return this.OrderItemRepository.save(orderItem);
  }
  //lay tat ca don hang
  async findAll(): Promise<OrderItems[]> {
    return this.OrderItemRepository.find();
  }
  //tim don hang theo id
  async findOne(id: number): Promise<OrderItems> {
    return this.OrderItemRepository.findOneBy({ id });
  }
  //cap nhat don hang
  async update(
    id: number,
    UpdateOrderItemsDTO: UpdateOrderItemsDTO,
  ): Promise<OrderItems> {
    const orderItem = await this.OrderItemRepository.findOneBy({ id });

    if (!orderItem) {
      throw new NotFoundException('OrderItem not found');
    }

    // Cập nhật các thuộc tính từ DTO, nhưng không bao gồm order_id
    Object.assign(orderItem, UpdateOrderItemsDTO);

    return this.OrderItemRepository.save(orderItem);
  }
  //xoa don hang theo id
  async remove(id: number): Promise<void> {
    await this.OrderItemRepository.delete(id);
  }
}
