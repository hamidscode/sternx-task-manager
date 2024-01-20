import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DestroyTaskCommand } from './destroy-task.command';
import { TaskFactory } from 'domain/services';
import { DeleteTaskEvent } from 'application/services/';
import { RabbitPublisher } from 'application/services/proxies/publisher';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(DestroyTaskCommand)
export class DestroyTaskCommandHandler
  implements ICommandHandler<DestroyTaskCommand>
{
  constructor(
    private readonly taskFactory: TaskFactory,
    private readonly myPublisher: RabbitPublisher,
  ) {}

  async execute({ id }: DestroyTaskCommand): Promise<number> {
    const result = await this.taskFactory.destroyOne(id);
    if (result === 0) {
      throw new NotFoundException(`Task with id <${id}> not found`);
    }
    const event = new DeleteTaskEvent(id);
    this.myPublisher.publish(event);

    return result;
  }
}
