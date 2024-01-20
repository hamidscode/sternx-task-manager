import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DestroyTaskEvent } from './destroy-task.event';
import { Logger } from '@nestjs/common';

@EventsHandler(DestroyTaskEvent)
export class DestroyTaskEventHandler
  implements IEventHandler<DestroyTaskEvent>
{
  private readonly logger = new Logger(DestroyTaskEventHandler.name);

  handle(event: DestroyTaskEvent): any {
    this.logger.log(
      `Task with id:<${event?.id}> perman deleted from database. Assumed to delete this record from read database ...`,
    );
  }
}
