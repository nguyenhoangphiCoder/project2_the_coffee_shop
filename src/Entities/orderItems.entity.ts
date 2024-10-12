import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Orders } from './Orders.entity';
import { Product } from './Product.entity';
import { OrderItemToppings } from './orderItemToppinds.entity';

@Entity('order_items')
export class OrderItems {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => Orders, (order) => order.orderItems)
  order: Orders;
  @ManyToOne(() => Product, (product) => product.orderItems)
  product: Product;
  @Column({ type: 'enum', enum: ['S', 'M', 'L'] })
  size: 'S' | 'M' | 'L';
  @Column({ type: 'int' })
  quantity: number;
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
  @OneToMany(
    () => OrderItemToppings,
    (orderItemTopping) => orderItemTopping.orderItems,
  )
  orderItemToppings: OrderItemToppings[];
}
