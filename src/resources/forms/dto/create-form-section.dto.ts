import { CreateFormFieldDto } from './create-form-field-dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateFormSectionDto {
  formId: number;
  active: boolean;
  createdBy: number;
  updatedBy: number;

  @ApiProperty()
  @IsString()
  title: string;
  @ApiProperty()
  @IsString()
  subtitle?: string;
  @ApiProperty()
  @IsString()
  intro?: string;
  @ApiProperty()
  @IsString()
  outro?: string;
  @ApiProperty({ type: [CreateFormFieldDto] })
  fields: CreateFormFieldDto[];
}
