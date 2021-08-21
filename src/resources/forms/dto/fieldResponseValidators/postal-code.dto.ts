import { FormFieldResponseDto } from '../form-field-response.dto';
import { IsPostalCode } from 'class-validator';

export class PostalCodeDto extends FormFieldResponseDto {
  @IsPostalCode()
  response: string;
}
