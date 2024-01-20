import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateTaskCommand } from './create-task.command';
import { TaskEntity } from 'domain/models';
import { TaskFactory } from 'domain/services';
import { CreateTaskEvent } from 'application/services/';
import { RabbitPublisher } from 'application/services/proxies/publisher';

@CommandHandler(CreateTaskCommand)
export class CreateTaskCommandHandler
  implements ICommandHandler<CreateTaskCommand>
{
  constructor(
    private readonly taskFactory: TaskFactory,
    private readonly myPublisher: RabbitPublisher,
  ) {}

  async execute(command: CreateTaskCommand): Promise<TaskEntity> {
    const task = await this.taskFactory.create(command.task);

    const event = new CreateTaskEvent(task);
    this.myPublisher.publish(event);

    return task;
  }
}
