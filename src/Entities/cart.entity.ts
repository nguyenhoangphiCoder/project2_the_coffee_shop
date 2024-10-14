import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { CartItems } from './cartItems.entity';

@Entity('carts')
export class Carts {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => User, (user) => user.cart)
  user: User;
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
  // @OneToMany(() => CartItems, (cartItem) => cartItem.cart)
  // cartItem: CartItems[];
}
