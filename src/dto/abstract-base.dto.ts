import { IsDate, IsInt } from 'class-validator';

export class AbstractBaseDto {
  @IsInt()
  id: number;

  @IsDate()
  createdOn: Date = new Date();
  @IsInt()
  createdBy: number;
  @IsDate()
  updatedOn: Date = new Date();
  @IsInt()
  updatedBy: number;
}
