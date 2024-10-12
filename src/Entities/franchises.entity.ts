import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { join } from 'path';
import { Franchise_employees } from './franchiseEmployees.entity';
import { Product } from './Product.entity';
import { Orders } from './Orders.entity';

@Entity({ name: 'franchises' })
export class Franchises {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: 100 })
  name: string;
  @ManyToOne(() => User, (user) => user.franchise)
  @JoinColumn({ name: 'owner_id' })
  owner: User;
  @Column({ type: 'varchar', length: 255 })
  address: string;
  @Column({ type: 'varchar', length: 20, nullable: true })
  phone_number: string;
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
  @OneToMany(
    () => Franchise_employees,
    (franchise_employees) => franchise_employees.franchise,
  )
  franchise_employees: Franchise_employees[];
  @OneToMany(() => Product, (products) => products.franchises)
  products: Product[];
  @OneToMany(() => Orders, (order) => order.franchise)
  order: Orders[];
}
