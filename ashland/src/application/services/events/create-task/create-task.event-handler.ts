import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreateTaskEvent } from './create-task.event';
import { Logger } from '@nestjs/common';

@EventsHandler(CreateTaskEvent)
export class CreateTaskEventHandler implements IEventHandler<CreateTaskEvent> {
  private readonly logger = new Logger(CreateTaskEventHandler.name);

  handle(event: CreateTaskEvent): any {
    this.logger.log(
      `new task with id:<${event.task?.id}> and title: <${event.task?.title}> created. Assumed to write in read database ...`,
    );
    this.logger.debug(JSON.stringify(event.task, null, 2));
  }
}
