import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderItems } from './orderItems.entity';
import { Toppings } from './topping.entity';

@Entity('order_item_toppings')
export class OrderItemToppings {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => OrderItems, (orderItems) => orderItems.orderItemToppings, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'order_item_id' })
  orderItems: OrderItems;

  @ManyToOne(() => Toppings, (topping) => topping.orderItemTopping, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'topping_id' })
  toppings: Toppings; // Thay đổi từ Toppings[] thành Toppings

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
