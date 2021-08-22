import { FormFieldResponseDto } from '../form-field-response.dto';
import { IsNumber } from 'class-validator';

export class SelectionDto extends FormFieldResponseDto {
  @IsNumber()
  response: number;
}
