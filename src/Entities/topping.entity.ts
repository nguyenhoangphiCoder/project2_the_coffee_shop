import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { OrderItemToppings } from './orderItemToppinds.entity';

@Entity('toppings')
export class Toppings {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 1000 })
  price: number;
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
  @OneToMany(
    () => OrderItemToppings,
    (OrderItemToppings) => OrderItemToppings.toppings,
  )
  orderItemTopping: OrderItemToppings[];
}
