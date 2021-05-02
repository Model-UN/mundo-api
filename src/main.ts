import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  // Initialize Nest-Fastify app
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  /* Swagger Config
   * For more information on OpenAPI, fastify-swagger, @nestjs/swagger, refer to
   * the Nest documentation: https://docs.nestjs.com/openapi/introduction
   */
  const config = new DocumentBuilder()
    .setTitle('MUNDO Conference API')
    .setDescription('ReST-ful data access layer for MUNDO Conferences.')
    .setVersion('1.0')
    .addTag('model-un')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Set listener at localhost:3000
  await app.listen(3000, '0.0.0.0');
}
// Bootstrap Nest App
// noinspection JSIgnoredPromiseFromCall
bootstrap();
