import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { LoggerModule } from './logger.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { RMQ_CONFIG } from 'infrastructure/config';
import { ASHLAND_QUEUE } from 'infrastructure/constants';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    LoggerModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [RMQ_CONFIG()],
        queue: ASHLAND_QUEUE,
        prefetchCount: 1,
        noAck: false,
        queueOptions: {
          durable: true,
        },
      },
    },
  );
  await app.listen();
  Logger.log(`Ashland logger service is running. :D`);
}
bootstrap();
