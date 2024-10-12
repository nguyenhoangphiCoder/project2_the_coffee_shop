import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductPromotions } from './productPromotion.entity';

@Entity({
  name: 'promotions',
})
export class Promotion {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: 100 })
  name: string;
  @Column({ type: 'text', nullable: true })
  description: string;
  @Column({ type: 'varchar', length: 50 })
  discount_value: number;
  @Column({ type: 'date' })
  start_date: Date;
  @Column({ type: 'date' })
  end_date: Date;
  @Column({ type: 'enum', enum: ['active', 'inactive'], default: 'inactive' })
  status: 'active' | 'inactive';
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
  @OneToMany(
    () => ProductPromotions,
    (productPromotions) => productPromotions.promotions,
  )
  productPromotions: ProductPromotions[];
}
