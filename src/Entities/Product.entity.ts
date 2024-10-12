import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Franchises } from './franchises.entity';
import { ProductSize } from './productSize.entity';
import { ProductPromotions } from './productPromotion.entity';
import { productCategories } from './productcategories.emtity';
import { ProductImages } from './productImage.entity';
import { OrderItems } from './orderItems.entity';
import { CartItems } from './cartItems.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: 255 })
  name: string;
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;
  @Column({ type: 'text', nullable: true })
  description: string;
  @Column({ type: 'int', nullable: true })
  quatity: number;
  @Column({ type: 'int', default: 0 })
  quantity_sold: number;
  @ManyToOne(() => Franchises, (franchises) => franchises.products, {
    onDelete: 'CASCADE',
  })
  franchises: Franchises;
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
  @OneToMany(() => ProductSize, (productsize) => productsize.products)
  size: ProductSize[];
  @OneToMany(
    () => ProductPromotions,
    (productPromotions) => productPromotions.products,
  )
  promotions: ProductPromotions[];
  @OneToMany(
    () => productCategories,
    (productcategories) => productcategories.product,
  )
  productcategories: productCategories[];
  @OneToMany(() => ProductImages, (productiamges) => productiamges.product)
  images: ProductImages[];
  @OneToMany(() => OrderItems, (OrderItems) => OrderItems.product)
  orderItems: OrderItems[];
  @OneToMany(() => CartItems, (cartItem) => cartItem.product)
  cartItem: CartItems[];
}
