import { FormFieldResponseDto } from '../form-field-response.dto';
import { IsDate, IsPhoneNumber } from 'class-validator';

export class DateDto extends FormFieldResponseDto {
  @IsDate()
  response: Date;
}
