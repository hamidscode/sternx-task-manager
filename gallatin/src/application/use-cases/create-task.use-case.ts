import { Injectable, NotFoundException } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { TaskMapper } from 'domain/services';
import { CreateTaskRequest, Task } from 'infrastructure/interfaces';
import { CreateTaskCommand } from 'application/services';
import { TaskSerializer } from 'application/serializers';
import { GetTaskByIdQuery } from 'application/services/queries';

@Injectable()
export class CreateTaskUseCase {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly taskMapper: TaskMapper,
  ) {}

  async createTask(request: CreateTaskRequest): Promise<Task> {
    if (request.parentId) {
      const parent = await this.queryBus.execute(
        new GetTaskByIdQuery(request.parentId),
      );
      if (!parent) {
        throw new NotFoundException(
          `Parent task with id ${request.parentId} not found`,
        );
      }
    }
    const entity = this.taskMapper.convertRequestToEntity(request);
    const newTask = await this.commandBus.execute(
      new CreateTaskCommand(entity),
    );
    const serializedTask = new TaskSerializer(newTask);
    return serializedTask;
  }
}
