import { Module } from '@nestjs/common';
import { ConferencesService } from './conferences.service';
import { ConferencesController } from './conferences.controller';

@Module({
  controllers: [ConferencesController],
  providers: [ConferencesService]
})
export class ConferencesModule {}
