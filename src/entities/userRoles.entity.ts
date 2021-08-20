import { BaseEntity, Column, Entity, ManyToOne } from 'typeorm';
import { Users } from './users.entity';
import { UserRolesEnum } from '../common/enumerations/userRoles.enum';

@Entity()
export class UserRoles extends BaseEntity {
  @Column({ primary: true })
  @ManyToOne(() => Users, (user) => user.id)
  userId: number;
  @Column({
    type: 'enum',
    enum: UserRolesEnum,
    nullable: false,
    primary: true,
  })
  role: UserRolesEnum;
}
