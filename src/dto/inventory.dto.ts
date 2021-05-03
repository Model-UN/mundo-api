import { AbstractBaseDto } from './abstract-base.dto';
import { IsInt, IsString } from 'class-validator';

export class InventoryDto extends AbstractBaseDto {
  @IsString()
  name: string;
  @IsInt()
  owner: number;
}
