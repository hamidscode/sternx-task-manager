import { BadRequestException, Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { TaskMapper } from 'domain/services';
import {
  DeleteTaskRequest,
  DestroyTaskRequest,
  UpdateTaskRequest,
} from 'infrastructure/interfaces';
import {
  UpdateTaskCommand,
  DeleteTaskCommand,
  DestroyTaskCommand,
} from 'application/services';
import { FetchTaskUseCase } from './fetch-task.use-case';

@Injectable()
export class ManageTasksUseCase {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly taskMapper: TaskMapper,
    private readonly fetchTaskUseCase: FetchTaskUseCase,
  ) {}
  async updateTask(request: UpdateTaskRequest): Promise<number> {
    if (!request.id || !request.update) {
      throw new BadRequestException('id and update are required');
    }
    await this.fetchTaskUseCase.getTaskById(request.id);
    if (request.update.parentId === '') {
      request.update.parentId = null;
    }
    const entity = this.taskMapper.convertRequestToEntity({
      ...request.update,
      id: request.id,
    });
    return this.commandBus.execute(new UpdateTaskCommand(request.id, entity));
  }
  async deleteTask(request: DeleteTaskRequest): Promise<number> {
    await this.fetchTaskUseCase.getTaskById(request.id);
    return this.commandBus.execute(new DeleteTaskCommand(request.id));
  }

  async destroyTask(request: DestroyTaskRequest): Promise<number> {
    await this.fetchTaskUseCase.getTaskById(request.id);
    return this.commandBus.execute(new DestroyTaskCommand(request.id));
  }
}
