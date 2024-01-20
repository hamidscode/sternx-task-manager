import { Metadata } from '@grpc/grpc-js';
import { HttpStatus, Logger } from '@nestjs/common';
import { GrpcMethod, GrpcService } from '@nestjs/microservices';
import {
  CreateTaskRequest,
  OneTaskResponse,
  Meta,
  TASK_SERVICE_NAME,
  TaskServiceController,
  DeleteTaskRequest,
  DestroyTaskRequest,
  GetAllTasksRequest,
  GetAllTasksResponse,
  GetTaskByIdRequest,
  UpdateTaskRequest,
  UpdateTaskResponse,
  DestroyTaskResponse,
} from 'infrastructure/interfaces';
import {
  CreateTaskUseCase,
  FetchTaskUseCase,
  ManageTasksUseCase,
} from 'application/use-cases';

@GrpcService(TASK_SERVICE_NAME)
export class TaskController
  implements
    Pick<
      TaskServiceController,
      | 'createTask'
      | 'updateTask'
      | 'getTaskById'
      | 'deleteTask'
      | 'destroyTask'
      | 'getAllTasks'
    >
{
  private readonly logger = new Logger(TaskController.name);

  constructor(
    private readonly createTaskUseCase: CreateTaskUseCase,
    private readonly fetchTaskUseCase: FetchTaskUseCase,
    private readonly manageTasksUseCase: ManageTasksUseCase,
  ) {}

  private GrpcErrorHandler(error: any): { meta: Meta } {
    const status =
      error.status || error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
    console.log(error);
    status === HttpStatus.INTERNAL_SERVER_ERROR && this.logger.error(error);

    return {
      meta: {
        status: status,
        message: status ? error.message : 'internal server error',
      },
    };
  }
  @GrpcMethod(TASK_SERVICE_NAME, 'createTask')
  async createTask(
    request: CreateTaskRequest,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    metadata?: Metadata, // we can send and receive authorization data here
  ): Promise<OneTaskResponse> {
    try {
      const newTask = await this.createTaskUseCase.createTask(request);
      return {
        meta: {
          status: HttpStatus.CREATED,
        },
        task: newTask,
      };
    } catch (error) {
      return this.GrpcErrorHandler(error);
    }
  }

  @GrpcMethod(TASK_SERVICE_NAME, 'updateTask')
  async updateTask(
    request: UpdateTaskRequest,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    metadata?: Metadata, // we can send and receive authorization data here
  ): Promise<UpdateTaskResponse> {
    try {
      const affected = await this.manageTasksUseCase.updateTask(request);
      return {
        meta: {
          status: HttpStatus.OK,
        },
        affected_row_count: affected,
      };
    } catch (error) {
      return this.GrpcErrorHandler(error);
    }
  }

  @GrpcMethod(TASK_SERVICE_NAME, 'getTaskById')
  async getTaskById(
    request: GetTaskByIdRequest,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    metadata?: Metadata, // we can send and receive authorization data here
  ): Promise<OneTaskResponse> {
    try {
      const task = request.include_sub_tasks
        ? await this.fetchTaskUseCase.getTaskWithSubTasksById(request.id)
        : await this.fetchTaskUseCase.getTaskById(request.id);
      return {
        meta: {
          status: HttpStatus.OK,
        },
        task,
      };
    } catch (error) {
      return this.GrpcErrorHandler(error);
    }
  }

  @GrpcMethod(TASK_SERVICE_NAME, 'deleteTask')
  async deleteTask(
    request: DeleteTaskRequest,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    metadata?: Metadata, // we can send and receive authorization data here
  ): Promise<UpdateTaskResponse> {
    try {
      const affected = await this.manageTasksUseCase.deleteTask(request);
      return {
        meta: {
          status: HttpStatus.OK,
        },
        affected_row_count: affected,
      };
    } catch (error) {
      return this.GrpcErrorHandler(error);
    }
  }

  @GrpcMethod(TASK_SERVICE_NAME, 'destroyTask')
  async destroyTask(
    request: DestroyTaskRequest,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    metadata?: Metadata, // we can send and receive authorization data here
  ): Promise<DestroyTaskResponse> {
    try {
      const affected = await this.manageTasksUseCase.destroyTask(request);
      return {
        meta: {
          status: HttpStatus.OK,
        },
        destroyed_row_count: affected,
      };
    } catch (error) {
      return this.GrpcErrorHandler(error);
    }
  }

  @GrpcMethod(TASK_SERVICE_NAME, 'getAllTasks')
  async getAllTasks(
    request: GetAllTasksRequest,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    metadata?: Metadata, // we can send and receive authorization data here
  ): Promise<GetAllTasksResponse> {
    try {
      const tasks = request.include_sub_tasks
        ? await this.fetchTaskUseCase.getAllTasksWithTree(request)
        : await this.fetchTaskUseCase.getAllTasks(request);
      return {
        meta: {
          status: HttpStatus.OK,
        },
        tasks,
      };
    } catch (error) {
      return { ...this.GrpcErrorHandler(error), tasks: [] };
    }
  }
}
