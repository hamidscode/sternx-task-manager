import { NestFactory } from '@nestjs/core';
import { BffModule } from './bff.module';
import { join } from 'path';

process.env.__proto_path = join(__dirname, 'infrastructure/proto/');

async function bootstrap() {
  const app = await NestFactory.create(BffModule);
  await app.listen(3000);
}
bootstrap();
