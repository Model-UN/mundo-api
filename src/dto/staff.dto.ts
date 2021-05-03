import { UserBaseDto } from './user-base.dto';
import { StaffDepartment } from '../common/enumerations/staff-departments.enum';
import { IsEnum } from 'class-validator';

export class StaffDto extends UserBaseDto {
  @IsEnum(StaffDepartment)
  department: StaffDepartment;
}
