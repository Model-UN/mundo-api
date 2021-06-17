import { ProjectMetadataDto } from './project-metadata.dto';

describe('ProjectDto', () => {
  it('should be defined', () => {
    expect(new ProjectMetadataDto()).toBeDefined();
  });
});
