import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { Swagger } from './middleware/swagger';
import { fastifyHelmet } from 'fastify-helmet';

async function bootstrap() {
  // Initialize Nest-Fastify app
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  Swagger.configure(app);
  // enable CORS
  app.enableCors();
  await app.register(fastifyHelmet);
  // Set listener at localhost:$PORT
  await app.listen(process.env.PORT, '0.0.0.0');
}
// Bootstrap Nest App
// noinspection JSIgnoredPromiseFromCall
bootstrap();
