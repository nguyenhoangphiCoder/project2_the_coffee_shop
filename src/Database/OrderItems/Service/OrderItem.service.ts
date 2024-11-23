import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderItems } from 'src/Entities/orderItems.entity';
import { Orders } from 'src/Entities/Orders.entity';
import { Product } from 'src/Entities/Product.entity';
import { CreateOrderItemDTO, UpdateOrderItemsDTO } from '../DTO/OrderItem.dto';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(OrderItems)
    private readonly orderItemRepository: Repository<OrderItems>,

    @InjectRepository(Orders)
    private readonly orderRepository: Repository<Orders>,

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  // Tạo Order Item mới
  async create(createOrderItemDTO: CreateOrderItemDTO): Promise<OrderItems> {
    const order = await this.orderRepository.findOne({
      where: { id: createOrderItemDTO.order_id },
    });

    const product = await this.productRepository.findOne({
      where: { id: createOrderItemDTO.product_id },
    });

    if (!order || !product) {
      throw new NotFoundException('Order or Product not found');
    }

    const orderItem = this.orderItemRepository.create({
      ...createOrderItemDTO,
      order,
      product,
    });

    return this.orderItemRepository.save(orderItem);
  }

  // Lấy tất cả Order Items
  async findAll(): Promise<OrderItems[]> {
    return this.orderItemRepository.find({
      relations: ['product'], // Bao gồm thông tin sản phẩm
    });
  }

  // Lấy một Order Item theo ID
  async findOne(id: number): Promise<OrderItems> {
    const orderItem = await this.orderItemRepository.findOne({
      where: { id },
      relations: ['product'], // Bao gồm thông tin sản phẩm
    });

    if (!orderItem) {
      throw new NotFoundException('OrderItem not found');
    }

    return orderItem;
  }

  // Lấy Order Items theo Order ID
  async findByOrderId(order_id: number): Promise<OrderItems[]> {
    const orderItems = await this.orderItemRepository.find({
      where: { order: { id: order_id } },
      relations: ['product'], // Bao gồm thông tin sản phẩm
    });

    if (!orderItems.length) {
      throw new NotFoundException('No items found for the specified order');
    }

    return orderItems;
  }

  // Cập nhật Order Item
  async update(
    id: number,
    updateOrderItemsDTO: UpdateOrderItemsDTO,
  ): Promise<OrderItems> {
    const orderItem = await this.orderItemRepository.findOne({
      where: { id },
    });

    if (!orderItem) {
      throw new NotFoundException('OrderItem not found');
    }

    Object.assign(orderItem, updateOrderItemsDTO);

    return this.orderItemRepository.save(orderItem);
  }

  // Xóa Order Item theo ID
  async remove(id: number): Promise<void> {
    const result = await this.orderItemRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('OrderItem not found');
    }
  }

  // Xóa tất cả Order Items
  async removeAll(): Promise<void> {
    const allItems = await this.orderItemRepository.find();

    if (allItems.length === 0) {
      throw new NotFoundException('No items found to delete');
    }

    await this.orderItemRepository.delete(allItems.map((item) => item.id));
  }
}
