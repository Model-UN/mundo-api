import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsObject } from 'class-validator';

export class SubmissionGetDto {
  @ApiProperty()
  @IsNumber()
  responseId: number;
  @ApiProperty()
  @IsObject()
  responses: Record<string, unknown>;
}
