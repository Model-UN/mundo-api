import { FormFieldResponseDto } from '../form-field-response.dto';
import { IsString, MaxLength } from 'class-validator';

export class LongAnswerDto extends FormFieldResponseDto {
  @IsString()
  @MaxLength(99999)
  response: Date;
}
