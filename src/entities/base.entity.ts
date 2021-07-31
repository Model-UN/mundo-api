import {
  BaseEntity,
  Column,
  CreateDateColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

export class ApiBaseEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  active: boolean;
  @ManyToOne(() => User)
  @Column()
  createdBy: number;
  @ManyToOne(() => User)
  @Column()
  updatedBy: number;
  @CreateDateColumn()
  createdOn: Date;
  @UpdateDateColumn()
  updatedOn: Date;
}
