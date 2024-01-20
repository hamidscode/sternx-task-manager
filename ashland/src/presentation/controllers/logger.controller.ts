import { Controller, Logger } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { CQRS_EVENT_BUS } from 'infrastructure/constants';
import { EventBus } from '@nestjs/cqrs';
import { Events } from 'application/services';

@Controller()
export class LoggerController {
  private readonly logger = new Logger(LoggerController.name);

  constructor(private readonly eventBus: EventBus) {}

  @MessagePattern(CQRS_EVENT_BUS)
  async eventBusHandler(
    @Payload() data: { payload: any; event: string },
    @Ctx() context: RmqContext,
  ) {
    try {
      const event = Events[data.event];

      if (event) {
        this.eventBus.publish(plainToInstance(event, data.payload));
      } else {
        this.logger.warn(`unknown event ${data.event}. message ignored!`);
      }

      const channel = context.getChannelRef();
      const orginalMessage = context.getMessage();
      channel.ack(orginalMessage);
    } catch (error) {
      this.logger.error(error);
    }
  }
}
