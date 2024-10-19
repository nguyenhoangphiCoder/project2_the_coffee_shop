import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderItemToppings } from 'src/Entities/orderItemToppings.entity';
import { Repository } from 'typeorm';
import {
  CreateOrderItemToppingDTO,
  UpdateOrderItemToppingDTO,
} from '../DTO/OrderTopping.dto';
import { OrderItems } from 'src/Entities/orderItems.entity';
import { Toppings } from 'src/Entities/topping.entity';
import { UpdateOrderDTO } from 'src/Database/Orders/DTO/Order.dto';

@Injectable()
export class OrderItemToppingService {
  constructor(
    @InjectRepository(OrderItemToppings)
    private OrderItemToppingRepository: Repository<OrderItemToppings>,
    @InjectRepository(OrderItems)
    private OrderItemRepository: Repository<OrderItems>,
    @InjectRepository(Toppings)
    private ToppingRepository: Repository<Toppings>,
  ) {}
  findAll() {
    return this.OrderItemToppingRepository.find({
      relations: ['order_item', 'topping'],
    });
  }
  findOne(id: number) {
    return this.OrderItemToppingRepository.findOne({
      where: { id },
      relations: ['order_item', 'topping'],
    });
  }
  async create(createOrderItemToppingDto: CreateOrderItemToppingDTO) {
    const orderItemTopping = new OrderItemToppings();

    const orderItem = await this.OrderItemRepository.findOne({
      where: { id: createOrderItemToppingDto.order_item_id },
    });
    const topping = await this.ToppingRepository.findOne({
      where: { id: createOrderItemToppingDto.topping_id },
    });

    // Kiểm tra nếu tồn tại orderItem và topping
    if (!orderItem || !topping) {
      throw new Error('Order Item or Topping not found');
    }

    orderItemTopping.orderItems = orderItem;
    orderItemTopping.toppings = topping;

    return this.OrderItemToppingRepository.save(orderItemTopping);
  }
  async update(
    id: number,
    updateOrderItemToppingDto: UpdateOrderItemToppingDTO,
  ) {
    const orderItemTopping = await this.OrderItemToppingRepository.findOne({
      where: { id },
    });

    // Kiểm tra sự tồn tại
    if (!orderItemTopping) {
      throw new Error('Order Item Topping not found');
    }

    // Cập nhật các thuộc tính nếu có
    if (updateOrderItemToppingDto.order_item_id) {
      const orderItem = await this.OrderItemRepository.findOne({
        where: { id: updateOrderItemToppingDto.order_item_id },
      });
      if (!orderItem) {
        throw new Error('Order Item not found');
      }
      orderItemTopping.orderItems = orderItem; // Cập nhật order item
    }

    if (updateOrderItemToppingDto.topping_id) {
      const topping = await this.ToppingRepository.findOne({
        where: { id: updateOrderItemToppingDto.topping_id },
      });
      if (!topping) {
        throw new Error('Topping not found');
      }
      orderItemTopping.toppings = topping; // Cập nhật topping
    }

    return this.OrderItemToppingRepository.save(orderItemTopping);
  }

  remove(id: number) {
    return this.OrderItemToppingRepository.delete(id);
  }
}
