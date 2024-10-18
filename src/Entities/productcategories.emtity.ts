import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Categories } from './categories.entity';
import { Product } from './Product.entity';

@Entity('product_categories')
export class productCategories {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => Categories, (category) => category.productcategories)
  @JoinColumn({ name: 'category_id' })
  category: Categories;
  @ManyToOne(() => Product, (product) => product.productcategories)
  @JoinColumn({ name: 'product_id' })
  product: Product;
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
