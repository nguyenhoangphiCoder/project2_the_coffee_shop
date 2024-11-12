import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { passwordResetTokens } from './passwordResetTokens.entity';
import { addresses } from './address.entity';
import { Franchises } from './franchises.entity';
import { Franchise_employees } from './franchiseEmployees.entity';
import { PaymentMethod } from './paymentMethod.entity';
import { Orders } from './Orders.entity';
import { Carts } from './cart.entity';
import { CartItems } from './cartItems.entity';
@Entity('users')
export class User {
  @PrimaryGeneratedColumn() //tụe dộng tăng khoÁ chính
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 20, unique: true })
  phone_number: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'varchar', length: 512, nullable: true })
  avatar_url?: string;

  @Column({ type: 'varchar', length: 15, nullable: true })
  favorite_theme?: string;

  @Column({
    type: 'varchar',
    enum: ['customer', 'employee', 'admin', 'franchise_owner'],
    default: 'customer',
  })
  role: 'customer' | 'employee' | 'admin' | 'franchise_owner';

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @OneToMany(() => passwordResetTokens, (token) => token.user)
  passwordResetTokens: passwordResetTokens[];

  @OneToMany(() => addresses, (address) => address.user)
  @JoinColumn({ name: 'address_id' })
  addresses: addresses[];

  @OneToMany(() => Franchises, (franchise) => franchise.owner)
  franchise: Franchises[];

  @OneToMany(
    () => Franchise_employees,
    (franchise_employees) => franchise_employees.employee,
  )
  franchises_employees: Franchise_employees[];

  @OneToMany(() => PaymentMethod, (paymentMethod) => paymentMethod.user)
  paymentMethods: PaymentMethod;

  @OneToMany(() => Orders, (orders) => orders.user)
  orders: Orders[];

  @OneToMany(() => Orders, (orders) => orders.managed_by)
  managed_by: Orders[];

  @OneToMany(() => Carts, (cart) => cart.user)
  cart: Carts[];
}
