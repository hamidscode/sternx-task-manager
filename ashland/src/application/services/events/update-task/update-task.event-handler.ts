import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UpdateTaskEvent } from './update-task.event';
import { Logger } from '@nestjs/common';

@EventsHandler(UpdateTaskEvent)
export class UpdateTaskEventHandler implements IEventHandler<UpdateTaskEvent> {
  private readonly logger = new Logger(UpdateTaskEventHandler.name);

  handle(event: UpdateTaskEvent): any {
    this.logger.log(
      `Task with id:<${event.task?.id}> has been updated. Assumed to update read database ...`,
    );
    this.logger.debug(JSON.stringify(event.task, null, 2));
  }
}
