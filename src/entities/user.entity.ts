import {
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  firstName: string;
  @Column()
  lastName: string;
  @Column()
  email: string;
  @Column({ select: false })
  password: string;
  @CreateDateColumn()
  createdOn: Date;
  @Column()
  createdBy: number;
  @UpdateDateColumn()
  updatedOn: Date;
  @Column()
  updatedBy: number;
  @Column()
  active: boolean;
}
