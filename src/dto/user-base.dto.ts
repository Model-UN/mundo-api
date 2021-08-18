import { AbstractBaseDto } from './abstract-base.dto';
import { IsArray, IsDate, IsEmail, IsHash, IsString } from 'class-validator';
import { UserRolesEnum } from '../common/enumerations/userRoles.enum';

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
  @IsArray()
  roles: UserRolesEnum[];
  @IsArray()
  conferences: number[];
}
