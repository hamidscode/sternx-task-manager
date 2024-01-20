import { Injectable, NotFoundException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetAllTasksRequest, Task } from 'infrastructure/interfaces';
import {
  GetFullTaskByIdQuery,
  GetTaskByIdQuery,
  GetAllTasksQuery,
  GetAllTasksWithTreeQuery,
} from 'application/services/queries';
import { TaskSerializer } from 'application/serializers';

@Injectable()
export class FetchTaskUseCase {
  constructor(private readonly queryBus: QueryBus) {}

  async getTaskById(id: string): Promise<Task> {
    const task = await this.queryBus.execute(new GetTaskByIdQuery(id));
    if (!task) {
      throw new NotFoundException(`task with id <${id}> not found`);
    }
    const serializedTask = new TaskSerializer(task);
    return serializedTask;
  }

  async getTaskWithSubTasksById(id: string): Promise<Task> {
    const task = await this.queryBus.execute(new GetFullTaskByIdQuery(id));
    if (!task) {
      throw new NotFoundException(`task with id <${id}> not found`);
    }
    const serializedTask = new TaskSerializer(task);
    return serializedTask;
  }

  async getAllTasks(request: GetAllTasksRequest): Promise<Task[]> {
    const tasks = await this.queryBus.execute(
      new GetAllTasksQuery(request.query, request.pagination),
    );
    const result = tasks.rows.map((task) => new TaskSerializer(task));
    return result;
  }

  async getAllTasksWithTree(request: GetAllTasksRequest): Promise<Task[]> {
    const tasks = await this.queryBus.execute(
      new GetAllTasksWithTreeQuery(request.query, request.pagination),
    );
    const result = tasks.rows.map((task) => new TaskSerializer(task));
    return result;
  }
}
