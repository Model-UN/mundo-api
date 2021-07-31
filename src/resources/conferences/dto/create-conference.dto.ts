import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsString } from 'class-validator';

export class CreateConferenceDto {
  active: boolean;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  venueName: string;
  @ApiProperty()
  @IsString()
  venueAddress: string;
  @ApiProperty()
  @IsString()
  venueCity: string;
  @ApiProperty()
  @IsString()
  venuePostalCode: string;
  @ApiProperty()
  @IsString()
  venueLocale: string;
  @ApiProperty()
  @IsString()
  venueCountry: string;

  @ApiProperty()
  @IsDate()
  startDate: Date;
  @ApiProperty()
  @IsDate()
  endDate: Date;
}
