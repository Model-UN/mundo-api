import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id;
  @Column()
  firstName: string;
  @Column()
  lastName: string;
  @Column()
  dateOfBirth: Date;
  @Column()
  phoneNumber?: string;
  @Column({ unique: true })
  email: string;
  @Column({ select: false })
  password: string;
  @Column()
  active: boolean;
  @ManyToOne(() => User, (user) => user.id)
  @Column({ nullable: true })
  updatedBy?: number;
  @CreateDateColumn()
  createdOn: Date;
  @UpdateDateColumn()
  updatedOn?: Date;
}
