import { IsEnum, IsInt, IsString } from 'class-validator';
import { CommitteeType } from '../common/enumerations/committee-types.enum';

export class CommitteesDto {
  @IsString()
  committeeName: string;
  @IsEnum(CommitteeType)
  type: CommitteeType;
  @IsInt()
  backgroundGuide: number;
}
