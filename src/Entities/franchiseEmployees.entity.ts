import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Franchises } from './franchises.entity';
import { User } from './user.entity';

@Entity({ name: 'franchise_employees' })
export class Franchise_employees {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => Franchises, (franchise) => franchise.franchise_employees, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'franchise_id' })
  franchise: Franchises;
  @ManyToOne(() => User, (user) => user.franchises_employees, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'employee_id' })
  employee: User;
  @CreateDateColumn({ type: 'timestamp' })
  assigned_at: Date;
}
