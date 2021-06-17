import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './resources/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { typeormConfig } from './entities/ormconfig';
import { UsersModule } from './resources/users/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(typeormConfig),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
