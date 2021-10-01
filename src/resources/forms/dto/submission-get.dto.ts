import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsObject } from 'class-validator';
import { FormFieldResponses } from '../../../entities/formFieldResponses.entity';

export class SubmissionGetDto {
  @ApiProperty()
  @IsNumber()
  submissionId: number;
  @ApiProperty()
  @IsObject()
  responses: FormFieldResponses[];
}
