import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from './Product.entity';

@Entity('product_sizes')
export class ProductSize {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => Product, (products) => products.size, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  products: Product;
  @Column({ type: 'enum', enum: ['M', 'L', 'Xl'] })
  size: 'M' | 'L' | 'XL';
  @Column({ type: 'decimal' })
  price_adjustment: number;
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
