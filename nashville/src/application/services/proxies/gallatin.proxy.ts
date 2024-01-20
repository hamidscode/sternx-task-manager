import * as grpc from '@grpc/grpc-js';
import {HttpException, Inject, Injectable, OnModuleInit} from '@nestjs/common';
import {
  CreateTaskRequest,
  GetAllTasksRequest,
  Meta,
  Task,
  TASK_PACKAGE_NAME,
  TASK_SERVICE_NAME,
  TaskServiceClient,
  UpdateTaskRequest,
} from 'infrastructure/interfaces';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class GallatinProxy implements OnModuleInit {
  private gallatinGrpcService: TaskServiceClient;

  constructor(@Inject(TASK_PACKAGE_NAME) private readonly clinet: ClientGrpc) {}
  onModuleInit() {
    this.gallatinGrpcService =
      this.clinet.getService<TaskServiceClient>(TASK_SERVICE_NAME);
  }

  private checResponseMeta(meta: Meta): void {
    if (meta.status > 299) {
      throw new HttpException(meta.message, meta.status);
    }
  }

  async getTaskById(id: string, include_sub_tasks = false): Promise<Task> {
    const { meta, task } = await lastValueFrom(
      this.gallatinGrpcService.getTaskById({
        id,
        include_sub_tasks,
      }),
    );
    this.checResponseMeta(meta);
    return task;
  }

  async getAllTasks(request: GetAllTasksRequest): Promise<Task[]> {
    const { meta, tasks } = await lastValueFrom(
      this.gallatinGrpcService.getAllTasks(request),
    );
    this.checResponseMeta(meta);
    return tasks;
  }

  async createTask(request: CreateTaskRequest): Promise<Task> {
    const { meta, task } = await lastValueFrom(
      this.gallatinGrpcService.createTask(request),
    );
    this.checResponseMeta(meta);
    return task;
  }

  async updateTask(request: UpdateTaskRequest): Promise<number> {
    const { meta, affected_row_count } = await lastValueFrom(
      this.gallatinGrpcService.updateTask(request),
    );
    this.checResponseMeta(meta);
    return affected_row_count;
  }

  async deleteTask(id: string): Promise<number> {
    const { meta, affected_row_count } = await lastValueFrom(
      this.gallatinGrpcService.deleteTask({ id }),
    );
    this.checResponseMeta(meta);
    return affected_row_count;
  }

  async destroyTask(id: string): Promise<number> {
    const { meta, destroyed_row_count } = await lastValueFrom(
      this.gallatinGrpcService.destroyTask({ id }),
    );
    this.checResponseMeta(meta);
    return destroyed_row_count;
  }
}
