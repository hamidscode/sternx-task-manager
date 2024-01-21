import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { BffModule } from './bff.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NODE_ENV, APP_CONFIG } from './infrastructure/config';
import { join } from 'path';

process.env.__proto_path = join(__dirname, 'infrastructure/proto/');

async function bootstrap() {
  const app = await NestFactory.create(BffModule);

  if (NODE_ENV().IS_DEVELOPMENT) {
    const options = new DocumentBuilder()
      .setTitle(process.env.npm_package_name)
      .setDescription(process.env.npm_package_description)
      .setVersion(process.env.npm_package_version)
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document, {
      swaggerOptions: { docExpansion: 'none' },
    });
  }
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: false,
      },
    }),
  );
  await app.listen(APP_CONFIG().APP_PORT);
  const url = await app.getUrl();
  Logger.log(`Nashville micro-service is running on: ${url}`);
  Logger.log(`Swagger UI is running on: ${url}/api`);
  Logger.log(`OpenApi Spec is running on: ${url}/api-json`);
}
bootstrap();
