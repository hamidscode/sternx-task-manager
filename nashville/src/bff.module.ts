import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TASK_PACKAGE_NAME } from 'infrastructure/interfaces';
import { join } from 'path';
import {Controllers} from "presentation/controllers";
import {Proxies} from "application/services";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env${
        process.env.NODE_ENV ? '.' + process.env.NODE_ENV : ''
      }`,
      ignoreEnvFile: process.env.ENV_FILES
        ? process.env.ENV_FILES !== 'true'
        : false,
    }),
    ClientsModule.registerAsync({
      isGlobal: true,
      clients: [
        {
          name: TASK_PACKAGE_NAME,
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => ({
            transport: Transport.GRPC,
            options: {
              package: TASK_PACKAGE_NAME,
              channelOptions: {
                'grpc.max_reconnect_backoff_ms': 700,
                'grpc.min_reconnect_backoff_ms': 200,
                'grpc.initial_reconnect_backoff_ms': 400,
              },
              url: configService.get<string>(
                'GALLATIN_GRPC_URL',
                '127.0.0.1:5000',
              ),
              protoPath: join(
                configService.get<string>(
                  '__proto_path',
                  join(__dirname, 'infrastructure/proto/'),
                ),
                'task.proto',
              ),
              loader: {
                keepCase: true,
              },
            },
          }),
        },
      ],
    }),
  ],
  controllers: [...Controllers],
  providers: [...Proxies],
})
export class BffModule {}
