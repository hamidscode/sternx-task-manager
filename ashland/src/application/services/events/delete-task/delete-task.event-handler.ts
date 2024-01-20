import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DeleteTaskEvent } from './delete-task.event';
import { Logger } from '@nestjs/common';

@EventsHandler(DeleteTaskEvent)
export class DeleteTaskEventHandler implements IEventHandler<DeleteTaskEvent> {
  private readonly logger = new Logger(DeleteTaskEventHandler.name);

  handle(event: DeleteTaskEvent): any {
    this.logger.log(
      `Task with id:<${event?.id}> marked as delete. Assumed to Update in read database ...`,
    );
  }
}
