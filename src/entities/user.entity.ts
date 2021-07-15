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
  @Column({ unique: true })
  email: string;
  @Column({ select: false })
  password: string;
  @CreateDateColumn()
  createdOn: Date;
  @UpdateDateColumn()
  updatedOn: Date;
  @Column()
  active: boolean;
}
