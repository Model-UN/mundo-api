import { AbstractBaseDto } from './abstract-base.dto';
import {
  IsISO31661Alpha2,
  IsOptional,
  IsPostalCode,
  IsString,
  Length,
} from 'class-validator';

export class SchoolDto extends AbstractBaseDto {
  @IsString()
  schoolName: string;
  @IsString()
  address: string;
  @IsString()
  @Length(2, 2)
  state: string;
  @IsISO31661Alpha2()
  country: string;
  @IsPostalCode()
  @IsOptional()
  /* #TODO, Made zip optional, because international postal codes would be more
       difficult to handle. Would be NTH in the future. */
  zip?: string;
}
