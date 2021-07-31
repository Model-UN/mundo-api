import { Column, Entity } from 'typeorm';
import { ApiBaseEntity } from './base.entity';

@Entity()
export class Conference extends ApiBaseEntity {
  @Column()
  active: boolean;

  @Column()
  name: string;
  @Column()
  venueName: string;
  @Column()
  venueAddress: string;
  @Column()
  venueCity: string;
  @Column()
  venuePostalCode: string;
  @Column()
  venueLocale: string;
  @Column()
  venueCountry: string;

  @Column()
  startDate: Date;
  @Column()
  endDate: Date;
}
