import { UserBaseDto } from './user-base.dto';
import { IsInt } from 'class-validator';

export class DelegateDto extends UserBaseDto {
  @IsInt()
  school: number;
  @IsInt()
  committee: number;
}
