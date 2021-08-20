//
// SHORT_ANSWER,
// EMAIL,
// TELEPHONE,
// POSTAL_CODE,
// DATE,
// LONG_ANSWER,
// SELECTION,
// MULTIPLE_SELECTION,
// RANK,
//

import { FormFieldResponses } from '../../../../entities/formFieldResponses.entity';
import { IsString } from 'class-validator';

export const FormResponseValidationDtos = [
  ShortAnswerResponseDto,
  EmailResponseDto,
  TelephoneResponseDto,
  PostalCodeResponseDto,
  DateResponseDto,
  LongAnswerResponseDto,
  SelectionResponseDto,
  MultipleSelectionResponseDto,
  RankResponseDto,
];

class ShortAnswerResponseDto extends FormFieldResponses {
  @IsString({})
  response: string;
}
