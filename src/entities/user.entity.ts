import { Column, Entity } from 'typeorm';
import { ApiBaseEntity } from './base.entity';

@Entity()
export class User extends ApiBaseEntity {
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
}
