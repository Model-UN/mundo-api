import { MediaBaseDto } from './media-base.dto';
import { IsEnum } from 'class-validator';
import { DocumentMediaType } from '../common/enumerations/document-media-types.enum';

export class DocumentMediaDto extends MediaBaseDto {
  @IsEnum(DocumentMediaType)
  documentType: DocumentMediaType;
}
