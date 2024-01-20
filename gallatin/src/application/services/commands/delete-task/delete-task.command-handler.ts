import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteTaskCommand } from './delete-task.command';
import { TaskFactory } from 'domain/services';
import { DeleteTaskEvent } from 'application/services/';
import { RabbitPublisher } from 'application/services/proxies/publisher';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(DeleteTaskCommand)
export class DeleteTaskCommandHandler
  implements ICommandHandler<DeleteTaskCommand>
{
  constructor(
    private readonly taskFactory: TaskFactory,
    private readonly myPublisher: RabbitPublisher,
  ) {}

  async execute({ id }: DeleteTaskCommand): Promise<number> {
    const result = await this.taskFactory.deleteOne(id);
    if (result[0] === 0) {
      throw new NotFoundException(`Task with id <${id}> not found`);
    }
    const event = new DeleteTaskEvent(id);
    this.myPublisher.publish(event);

    return result[0];
  }
}
