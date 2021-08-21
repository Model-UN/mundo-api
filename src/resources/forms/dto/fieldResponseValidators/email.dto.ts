import { FormFieldResponseDto } from '../form-field-response.dto';
import { IsEmail, IsString } from 'class-validator';

export class EmailDto extends FormFieldResponseDto {
  @IsString()
  @IsEmail()
  response: Date;
}
