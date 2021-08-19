import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { FormFieldResponseDto } from './form-field-response.dto';

export class SubmitFormDto {
  userId: number;
  formId: number;

  @ApiProperty({ type: [FormFieldResponseDto] })
  @IsArray()
  responses: Array<FormFieldResponseDto>;
}
