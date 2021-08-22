import { FormFieldResponseDto } from '../form-field-response.dto';
import { IsArray, IsNumber } from 'class-validator';

export class MultipleSelectionDto extends FormFieldResponseDto {
  @IsNumber({}, { each: true })
  @IsArray()
  response: number[];
}
