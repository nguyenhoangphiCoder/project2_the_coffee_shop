import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
@Entity('password_reset_tokens')
export class passwordResetTokens {
  @PrimaryGeneratedColumn() //id tu dong tang
  id: number;
  @ManyToOne(() => User, (user) => user.passwordResetTokens, {
    onDelete: 'CASCADE',
  })
  @Column({ name: 'user_id' })
  user: User;
  @Column({ type: 'varchar', length: 255 })
  token: string;
  @Column({ type: 'timestamp' })
  expired_at: Date;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
