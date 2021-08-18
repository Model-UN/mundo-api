import { Module } from '@nestjs/common';
import { ConferencesService } from './conferences.service';
import { ConferencesController } from './conferences.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../../entities/users.entity';
import { Conferences } from '../../entities/conferences.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Conferences])],
  controllers: [ConferencesController],
  providers: [ConferencesService],
})
export class ConferencesModule {}
