"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const platform_fastify_1 = require("@nestjs/platform-fastify");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_fastify_1.FastifyAdapter());
    const config = new swagger_1.DocumentBuilder()
        .setTitle('MUNDO Conference API')
        .setDescription('ReST-ful data access layer for MUNDO Conferences.')
        .setVersion('1.0')
        .addTag('model-un')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(3000, '0.0.0.0');
}
bootstrap();
//# sourceMappingURL=main.js.map