import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
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
  @ManyToOne(() => Carts, (cart) => cart.cartItem)
  @JoinColumn({ name: 'cart_id' })
  cart: Carts;
  @ManyToOne(() => Product, (product) => product.cartItem, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product: Product;
  @Column({ type: 'int' })
  product_id: number;
  @Column({ type: 'int' })
  quantity: number;
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
