import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('addresses')
export class addresses {
  @PrimaryGeneratedColumn()
  address_id: number;

  @ManyToOne(() => User, (user) => user.addresses, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;
  @Column({ type: 'varchar', length: 255 })
  address_line: string;
  @Column({ type: 'varchar', length: 100 }) // Thành phố
  city: string;

  @Column({ type: 'varchar', length: 100, nullable: true }) // Tiểu bang (có thể để null)
  state?: string;

  @Column({ type: 'varchar', length: 20, nullable: true }) // Mã bưu điện
  postal_code?: string;

  @Column({ type: 'varchar', length: 100 }) // Quốc gia
  country: string;

  @Column({ type: 'boolean', default: false }) // Địa chỉ mặc định hay không
  is_default: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }) // Thời gian tạo bản ghi
  created_at: Date;
}
