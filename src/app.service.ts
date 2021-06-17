import { Injectable } from '@nestjs/common';
import { AppHttpResponseDto } from './dto/app-http-response.dto';
import { ProjectMetadataDto } from './dto/project-metadata.dto';

@Injectable()
export class AppService {
  // Base App related service methods. Typically, these would just return
  // system metadata and whatnot.
  metadata(): AppHttpResponseDto {
    return new AppHttpResponseDto(new ProjectMetadataDto());
  }

  health(): AppHttpResponseDto {
    // Check health of API. This can return anything.
    return new AppHttpResponseDto('Committee is now in session!');
  }
}
