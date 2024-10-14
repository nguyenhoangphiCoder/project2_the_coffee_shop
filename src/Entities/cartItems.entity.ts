import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Carts } from './cart.entity';
import { Product } from './Product.entity';

@Entity('cart_items')
export class CartItems {
  @PrimaryGeneratedColumn()
  id: number;
  // @ManyToOne(() => Carts, (cart) => cart.cartItem)
  // cart: Carts;
  // @ManyToOne(() => Product, (product) => product.cartItem)
  // product: Product;
  @Column({ type: 'int' })
  quantity: number;
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
