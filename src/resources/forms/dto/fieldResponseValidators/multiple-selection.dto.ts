import { FormFieldResponseDto } from '../form-field-response.dto';
import { IsNumber } from 'class-validator';

export class MultipleSelectionDto extends FormFieldResponseDto {
  @IsNumber({}, { each: true })
  response: number[];
}
