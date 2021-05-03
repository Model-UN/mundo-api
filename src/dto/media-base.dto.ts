import { AbstractBaseDto } from './abstract-base.dto';
import { MediaType } from '../common/enumerations/media-types.enum';
import { IsEnum, IsString, IsUrl } from 'class-validator';

export class MediaBaseDto extends AbstractBaseDto {
  @IsString()
  name: string;
  @IsUrl()
  url: string;
  @IsEnum(MediaType)
  type: MediaType;
}
