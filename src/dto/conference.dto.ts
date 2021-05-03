import { AbstractBaseDto } from './abstract-base.dto';
import { IsDate, IsInt, IsString } from 'class-validator';

export class ConferenceDto extends AbstractBaseDto {
  @IsString()
  name: string;
  @IsInt()
  year: number;
  @IsDate()
  startDate: Date = new Date();
  @IsDate()
  endDate: Date = new Date();
}
