import { FieldTypes } from '../../../common/enumerations/fieldTypes.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsEnum, IsString } from 'class-validator';

export class CreateFormFieldDto {
  sectionId: number;
  createdBy: number;
  updatedBy: number;
  active: boolean;
  @ApiProperty()
  @IsBoolean()
  required: boolean;
  @ApiProperty()
  @IsEnum(FieldTypes)
  fieldType: FieldTypes;
  @ApiProperty()
  @IsString()
  content: string;
  @ApiProperty()
  @IsString()
  description?: string;
  @ApiProperty()
  @IsArray()
  values: string[];
}
