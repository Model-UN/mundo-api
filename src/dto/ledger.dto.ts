import { AbstractBaseDto } from './abstract-base.dto';
import { LedgerEntryType } from '../common/enumerations/ledger-entry-types.enum';
import { IsEnum, IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

export class LedgerDto extends AbstractBaseDto {
  @IsEnum(LedgerEntryType)
  type: LedgerEntryType;
  @IsNumber()
  value: number;
  @IsInt()
  user: number;
  @IsString()
  @IsOptional()
  description?: string;
}
