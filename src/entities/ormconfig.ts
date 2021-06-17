import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EntityConfig } from './entity.config';

export const typeormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.PG_HOST,
  port: +process.env.PG_PORT,
  username: process.env.PG_USERNAME,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  entities: EntityConfig,
  synchronize: true,
};
