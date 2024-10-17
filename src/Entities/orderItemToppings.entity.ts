import {
  CreateDateColumn,
  Entity,
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
  // @ManyToOne(() => OrderItems, (OrderItems) => OrderItems.orderItemToppings, {
  //   onDelete: 'CASCADE',
  // })
  // orderItems: OrderItems;
  @ManyToOne(() => Toppings, (toppings) => toppings.orderItemTopping, {
    onDelete: 'CASCADE',
  })
  toppings: Toppings[];
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
