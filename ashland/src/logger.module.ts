import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventHandlers } from 'application/services';
import { LoggerController } from 'presentation/controllers';
import { CqrsModule } from '@nestjs/cqrs';

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
    CqrsModule.forRoot(),
  ],
  controllers: [LoggerController],
  providers: [...EventHandlers],
})
export class LoggerModule {}
