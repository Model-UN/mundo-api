import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './resources/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { UsersModule } from './resources/users/users.module';
import { EntityConfig } from './entities/entity.config';
import { SnakeNamingStrategy } from './middleware/snakeNamingStrategy';
import { ConferencesModule } from './resources/conferences/conferences.module';
import { FormsModule } from './resources/forms/forms.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PG_HOST,
      port: +process.env.PG_PORT,
      username: process.env.PG_USERNAME,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DATABASE,
      entities: EntityConfig,
      synchronize: true,
      migrationsTableName: 'change_log',
      migrations: ['../data/migrations/*.ts'],
      migrationsRun: true,
      namingStrategy: new SnakeNamingStrategy(),
      cli: {
        entitiesDir: './entities',
        migrationsDir: '../data/migrations/',
      },
    }),
    UsersModule,
    AuthModule,
    ConferencesModule,
    FormsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
