import { AppHttpResponseDto } from './app-http-response.dto';
import { ProjectMetadataDto } from './project-metadata.dto';

describe('AppHttpResponseDto', () => {
  it('should be defined with a string', () => {
    expect(new AppHttpResponseDto('Hello World!')).toBeDefined();
  });
  it('should be defined with a ProjectMetadataDto', () => {
    expect(new AppHttpResponseDto(new ProjectMetadataDto())).toBeDefined();
  });
});
