import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty()
  @IsString()
  firstName?: string;
  @ApiProperty()
  @IsString()
  lastName?: string;
  @ApiProperty()
  @IsString()
  email?: string;
  @ApiProperty()
  @IsString()
  phoneNumber?: string;
  @ApiProperty()
  @IsString()
  password?: string;
  @ApiProperty()
  @IsBoolean()
  active?: boolean;
  @ApiProperty()
  @IsNumber()
  updatedBy?: number;
}
