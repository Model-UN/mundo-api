import { AbstractBaseDTO } from './abstract-base.dto';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class ConferenceDto extends AbstractBaseDTO {
  @IsString()
  name: string;
  @IsNumber()
  year: number;
  @IsDate()
  startDate: Date = new Date();
  @IsDate()
  endDate: Date = new Date();
}
