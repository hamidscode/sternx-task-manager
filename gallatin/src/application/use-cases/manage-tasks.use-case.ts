import { Injectable, NotAcceptableException } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { TaskMapper } from 'domain/services';
import {
  CreateTaskRequest,
  DeleteTaskRequest,
  DestroyTaskRequest,
  Task,
  UpdateTaskRequest
} from 'infrastructure/interfaces';
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
  async updateTask(request: UpdateTaskRequest): Promise<Task> {

  }
  async deleteTask(request: DeleteTaskRequest): Promise<DeleteTaskResponse> {

  }

  async destroyTask(request: DestroyTaskRequest): Promise<DeleteTaskResponse> {
  }
}
