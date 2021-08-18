import {
  BaseEntity,
  Column,
  CreateDateColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Users } from './users.entity';

export class ApiBaseEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  active: boolean;
  @ManyToOne(() => Users, (user) => user.id)
  @Column()
  createdBy?: number;
  @ManyToOne(() => Users, (user) => user.id)
  @Column()
  updatedBy?: number;
  @CreateDateColumn()
  createdOn: Date;
  @UpdateDateColumn()
  updatedOn?: Date;
}
