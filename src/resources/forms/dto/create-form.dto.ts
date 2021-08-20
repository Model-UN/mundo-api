import { CreateFormSectionDto } from './create-form-section.dto';
import { IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFormDto {
  active: boolean;
  createdBy: number;
  updatedBy: number;

  @ApiProperty({ type: [CreateFormSectionDto] })
  @IsArray()
  sections: CreateFormSectionDto[];
}
