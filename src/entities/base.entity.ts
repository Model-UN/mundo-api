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
  @ManyToOne(() => User, (user) => user.id)
  @Column()
  createdBy?: number;
  @ManyToOne(() => User, (user) => user.id)
  @Column()
  updatedBy?: number;
  @CreateDateColumn()
  createdOn: Date;
  @UpdateDateColumn()
  updatedOn?: Date;
}
