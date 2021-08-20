import { ProjectMetadataDto } from './project-metadata.dto';

export class AppHttpResponseDto {
  constructor(message: string | ProjectMetadataDto) {
    this.message = message;
  }

  message: ProjectMetadataDto | string;
}
