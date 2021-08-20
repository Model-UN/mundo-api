import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FormFieldResponseDto {
  @ApiProperty()
  @IsNumber()
  id: number;
  @ApiProperty()
  response;
}
