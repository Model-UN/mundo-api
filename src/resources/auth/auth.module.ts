import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { UsersService } from '../users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';

@Module({
  providers: [AuthService, UsersService, LocalStrategy],
  imports: [TypeOrmModule.forFeature([User]), PassportModule],
  controllers: [AuthController],
})
export class AuthModule {}
