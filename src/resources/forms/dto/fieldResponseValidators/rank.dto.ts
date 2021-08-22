import { FormFieldResponseDto } from '../form-field-response.dto';
import { IsNumber } from 'class-validator';

export class RankDto extends FormFieldResponseDto {
  @IsNumber({}, { each: true })
  response: number[];
}
