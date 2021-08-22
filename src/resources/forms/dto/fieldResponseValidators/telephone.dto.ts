import { IsPhoneNumber, IsString } from 'class-validator';
import { FormFieldResponseDto } from '../form-field-response.dto';

export class TelephoneDto extends FormFieldResponseDto {
  @IsString()
  response: string;
}
