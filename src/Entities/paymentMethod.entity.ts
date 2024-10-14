import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Orders } from './Orders.entity';

@Entity('payment_methods')
export class PaymentMethod {
  @PrimaryGeneratedColumn()
  payment_method_id: number;
  @ManyToOne(() => User, (user) => user.paymentmethods)
  user: User;
  @Column({
    type: 'enum',
    enum: ['credit_card', 'e_wallet', 'cash_on_delivery'],
    default: 'credit_card',
  })
  method_type: string;
  @Column({ type: 'varchar', length: 100, nullable: true })
  provider_name: string;
  @Column({ type: 'varchar', length: 100, nullable: true })
  account_number: string;
  @Column({ type: 'date', nullable: true })
  expiry_date: string;
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
  // @OneToMany(() => Orders, (Orders) => Orders.payment_method)
  // Orders: Orders[];
}
