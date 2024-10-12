import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Categories } from './categories.rntity';
import { Product } from './Product.entity';

@Entity('product_categories')
export class productCategories {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => Categories, (category) => category.productcategories)
  category: Categories;
  @ManyToOne(() => Product, (product) => product.productcategories)
  product: Product;
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
