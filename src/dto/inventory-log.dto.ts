import { AbstractBaseDto } from './abstract-base.dto';
import { InventoryLogType } from '../common/enumerations/inventory-log-types.enum';
import { IsEnum, IsInt } from 'class-validator';

export class InventoryLogDto extends AbstractBaseDto {
  @IsInt()
  item: number;
  @IsEnum(InventoryLogType)
  type: InventoryLogType;
}
