import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateTaskCommand } from './update-task.command';
import { TaskFactory } from 'domain/services';
import { UpdateTaskEvent } from 'application/services/';
import { RabbitPublisher } from 'application/services/proxies/publisher';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(UpdateTaskCommand)
export class UpdateTaskCommandHandler
  implements ICommandHandler<UpdateTaskCommand>
{
  constructor(
    private readonly taskFactory: TaskFactory,
    private readonly myPublisher: RabbitPublisher,
  ) {}

  async execute({ id, update }: UpdateTaskCommand): Promise<number> {
    const result = await this.taskFactory.updateOne(update, { id });
    if (result[0] === 0) {
      throw new NotFoundException(`Task with id <${id}> not found`);
    }
    update.id = id;
    const event = new UpdateTaskEvent(update);
    this.myPublisher.publish(event);

    return result[0];
  }
}
