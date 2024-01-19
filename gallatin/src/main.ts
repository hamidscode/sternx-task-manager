import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { TaskManagerModule } from './task-manager.module';
import { join } from 'path';
import { TASK_PACKAGE_NAME } from 'infrastructure/interfaces';

const __proto_path = join(__dirname, 'infrastructure/proto/');
async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    TaskManagerModule,
    {
      transport: Transport.GRPC,
      options: {
        url: `0.0.0.0:${+process.env.GRPC_PORT || 5000}`,
        package: TASK_PACKAGE_NAME,
        protoPath: join(__proto_path, 'task.proto'),
        loader: {
          keepCase: true,
        },
      },
    },
  );
  await app.listen();
  Logger.log(`Gallatin task manager service is running. :D`);
  Logger.log(`GRPC is running on port: ${+process.env.GRPC_PORT || 5000}`);
}
bootstrap();
