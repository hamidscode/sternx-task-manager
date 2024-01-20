import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  CQRS_EVENT_BUS,
  GALLATIN_AMQP_SERVICE,
} from 'infrastructure/constants';
import { IEvent, IEventPublisher } from '@nestjs/cqrs';

@Injectable()
export class RabbitPublisher implements IEventPublisher {
  private readonly logger = new Logger(RabbitPublisher.name);

  constructor(@Inject(GALLATIN_AMQP_SERVICE) private amqpClient: ClientProxy) {}

  publish<T extends IEvent>(event: T): void {
    const data = {
      payload: event,
      event: event.constructor.name,
    };
    this.amqpClient
      .send(CQRS_EVENT_BUS, data)
      .subscribe({ error: this.logger.error });
  }
}
