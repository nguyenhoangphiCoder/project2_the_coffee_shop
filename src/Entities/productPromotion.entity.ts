import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Promotion } from './promotions.entity';
import { Product } from './Product.entity';

@Entity('product_promotions')
export class ProductPromotions {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => Promotion, (promotions) => promotions.productPromotions, {
    onDelete: 'CASCADE',
  })
  promotions: Promotion;
  @ManyToOne(() => Product, (products) => products.promotions, {
    onDelete: 'CASCADE',
  })
  products: Product;
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
