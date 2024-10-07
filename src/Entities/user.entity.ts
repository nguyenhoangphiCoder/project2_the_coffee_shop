import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';
@Entity('user')
export class User {
  @PrimaryGeneratedColumn() //tụe dộng tăng khoÁ chính
  id: number;
  @Column({ type: 'varchar', length: 100 })
  name: string;
  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;
  @Column({ type: 'varchar', length: 20, unique: true })
  phone_number: string;
  @Column({ type: 'varchar', length: 255 })
  password: string;
  @Column({ type: 'varchar', length: 255, nullable: true })
  avatar_url?: string;
  @Column({ type: 'varchar', length: 15, nullable: true })
  favorite_theme?: string;
  @Column({
    type: 'varchar',
    enum: ['customer', 'employee', 'admin', 'franchise_owner'],
    default: 'customer',
  })
  role: 'customer' | 'employee' | 'admin' | 'franchise_owner';
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  create_at: Date;
}
