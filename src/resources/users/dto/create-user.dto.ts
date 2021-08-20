import { IsEmail, IsString, IsDate, IsPhoneNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  active = false;
  createdBy: number;
  updatedBy: number;

  @ApiProperty()
  @IsString()
  firstName: string;
  @ApiProperty()
  @IsString()
  lastName: string;
  @ApiProperty()
  @IsEmail()
  email: string;
  @ApiProperty()
  @IsPhoneNumber()
  phoneNumber: string;
  @ApiProperty()
  @IsDate()
  dateOfBirth: string;
  @ApiProperty()
  @IsString()
  password: string;
}
