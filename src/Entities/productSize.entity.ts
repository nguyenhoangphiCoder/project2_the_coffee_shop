import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from './Product.entity';

@Entity('product_size')
export class ProductSize {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => Product, (products) => products.size, {
    onDelete: 'CASCADE',
  })
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
