import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ASHLAND_QUEUE, GALLATIN_AMQP_SERVICE } from 'infrastructure/constants';
import { SequelizeModule } from '@nestjs/sequelize';
import { RMQ_CONFIG } from 'infrastructure/config';
import { CqrsModule } from '@nestjs/cqrs';
import { Models } from 'domain/models';
import { Mappers, Repositories, Factories } from 'domain/services';
import { UseCases } from 'application/use-cases';
import { CommandHandlers, Proxies } from 'application/services';
import { Controllers } from 'presentation/controllers';
import { QueryHandlers } from 'application/services/queries';

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
    SequelizeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        dialect: 'postgres',
        host: configService.get<string>('POSTGRES_HOST', 'localhost'),
        port: parseInt(configService.get<string>('POSTGRES_PORT', '5432')),
        username: configService.get<string>('POSTGRES_USER', 'sternx'),
        password: configService.get<string>('POSTGRES_PASS', 'sternx'),
        database: configService.get<string>('POSTGRES_DB', 'task_manager'),
        models: Models,
      }),
    }),
    SequelizeModule.forFeature(Models),
    CqrsModule.forRoot(),
    ClientsModule.register([
      {
        name: GALLATIN_AMQP_SERVICE,
        transport: Transport.RMQ,
        options: {
          urls: [RMQ_CONFIG()],
          queue: ASHLAND_QUEUE,
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
    //EventEmitterModule.forRoot(),
  ],
  controllers: [...Controllers],
  providers: [
    ...Mappers,
    ...Repositories,
    ...Factories,
    ...Proxies,
    ...UseCases,
    ...CommandHandlers,
    ...QueryHandlers,
  ],
})
export class TaskManagerModule {}
