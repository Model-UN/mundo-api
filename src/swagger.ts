import { Injectable } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestFastifyApplication } from '@nestjs/platform-fastify';

@Injectable()
export class Swagger {
  /* Swagger Config
   * For more information on OpenAPI, fastify-swagger, @nestjs/swagger, refer to
   * the Nest documentation: https://docs.nestjs.com/openapi/introduction
   */
  static configure(app: NestFastifyApplication) {
    const config = new DocumentBuilder()
      .setTitle('MUNDO Conference API')
      .setDescription('REST-ful data access layer for MUNDO Conferences.')
      .setVersion('1.0')
      .addTag('meta')
      .addTag('authentication')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  }
}
