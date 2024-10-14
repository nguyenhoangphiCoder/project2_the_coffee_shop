import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { productCategories } from './productcategories.emtity';

@Entity('categories')
export class Categories {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: 255 })
  name: string;
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
  // @OneToMany(
  //   () => productCategories,
  //   (productcategories) => productcategories.category,
  // )
  // productcategories: productCategories[];
}
