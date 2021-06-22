import {
  message,
  description,
  github,
  collaborators,
} from '../common/constants/project-metadata';

export class ProjectMetadataDto {
  constructor() {
    this.message = message;
    this.description = description;
    this.github = github;
    this.team = [];
    for (const collaborator of collaborators) {
      if (collaborator.length === 3) {
        // @ts-ignore
        this.team.push(new TeamMember(...collaborator));
      }
    }
  }
  message: string;
  description: string;
  github: string;
  team: TeamMember[];
}

class TeamMember {
  constructor(name: string, title: string, github: string) {
    this.name = name;
    this.title = title;
    this.github = github;
  }
  name: string;
  title: string;
  github: string;
}
