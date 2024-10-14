import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { PaymentMethod } from './paymentMethod.entity';
import { Franchises } from './franchises.entity';
import { OrderItems } from './orderItems.entity';

@Entity('orders')
export class Orders {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => User, (user) => user.orders)
  user: User;
  @ManyToOne(() => PaymentMethod)
  payment_method: PaymentMethod;
  @ManyToOne(() => User) // Managed by another user (employee)
  managed_by: User;
  @Column({ type: 'varchar', length: 255 })
  buyer_name: string;
  @Column({ type: 'varchar', length: 20 })
  buyer_phone: string;
  @Column({ type: 'varchar', length: 100, nullable: true })
  buyer_email: string;
  @ManyToOne(() => Franchises)
  franchise: Franchises;
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
  @Column({
    type: 'enum',
    enum: ['pending', 'completed', 'cancelled'],
    default: 'pending',
  })
  status: string;
  // @OneToMany(() => OrderItems, (OrderItems) => OrderItems.order)
  // orderItems: OrderItems[];
}
