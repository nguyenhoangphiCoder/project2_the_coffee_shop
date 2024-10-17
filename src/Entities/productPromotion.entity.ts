import {
  CreateDateColumn,
  Entity,
  JoinColumn,
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
  @JoinColumn({ name: 'promotion_id' })
  promotions: Promotion;
  @ManyToOne(() => Product, (products) => products.promotions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  products: Product;
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
