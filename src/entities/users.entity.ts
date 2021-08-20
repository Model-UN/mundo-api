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
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
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
  @ManyToOne(() => Users, (user) => user.id)
  @Column({ nullable: true })
  updatedBy?: number;
  @CreateDateColumn()
  createdOn: Date;
  @UpdateDateColumn()
  updatedOn?: Date;
}
