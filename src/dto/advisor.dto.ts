import { UserBaseDto } from './user-base.dto';
import { IsInt } from 'class-validator';

export class AdvisorDto extends UserBaseDto {
  @IsInt()
  school: number;
}
