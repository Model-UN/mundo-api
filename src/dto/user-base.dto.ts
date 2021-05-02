import { AbstractBaseDto } from './abstract-base.dto';
import { Roles } from '../common/enumerations/roles';
import {
  IsArray,
  IsDate,
  IsEmail,
  IsEnum,
  IsHash,
  IsString,
} from 'class-validator';

export class UserBaseDto extends AbstractBaseDto {
  @IsString()
  firstName: string;
  @IsString()
  lastName: string;
  @IsEmail()
  email: string;
  @IsHash('sha256')
  password: string;
  @IsDate()
  date_of_birth: Date = new Date();
  @IsEnum(Roles)
  role: Roles;
  @IsArray()
  conferences: Array<number>;
}
