import { PartialType } from '@nestjs/swagger';
import { CreateConferenceDto } from './create-conference.dto';

export class UpdateConferenceDto extends PartialType(CreateConferenceDto) {}
