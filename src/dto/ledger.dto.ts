import { AbstractBaseDto } from './abstract-base.dto';
import { LedgerEntryType } from '../common/enumerations/ledger-entry-types.enum';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class LedgerDto extends AbstractBaseDto {
  @IsEnum(LedgerEntryType)
  type: LedgerEntryType;
  @IsNumber()
  value: number;
  @IsNumber()
  user: number;
  @IsString()
  @IsOptional()
  description?: string;
}
