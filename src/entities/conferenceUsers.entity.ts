import { BaseEntity, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Conferences } from './conferences.entity';
import { Users } from './users.entity';

@Entity()
export class ConferenceUsers extends BaseEntity {
  @PrimaryColumn()
  @ManyToOne(() => Conferences, (conference) => conference.id)
  conferenceId: number;
  @PrimaryColumn()
  @ManyToOne(() => Users, (user) => user.id)
  userId: number;
}
