import { IsString, MaxLength } from 'class-validator';
import { FormFieldResponseDto } from '../form-field-response.dto';

export class ShortAnswerDto extends FormFieldResponseDto {
  @IsString()
  @MaxLength(120)
  response: string;
}
