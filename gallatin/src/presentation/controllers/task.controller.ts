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
  DeleteTaskResponse,
  DestroyTaskRequest,
  GetAllTasksRequest,
  GetAllTasksResponse,
  GetTaskByIdRequest,
  UpdateTaskRequest,
} from 'infrastructure/interfaces';
import { CreateTaskUseCase } from 'application/use-cases';
import { Observable } from 'rxjs';

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

  constructor(private readonly createTaskUseCase: CreateTaskUseCase) {}

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
  updateTask(
    request: UpdateTaskRequest,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    metadata?: Metadata, // we can send and receive authorization data here
  ): OneTaskResponse | Promise<OneTaskResponse> | Observable<OneTaskResponse> {
    throw new Error('Method not implemented.');
  }

  @GrpcMethod(TASK_SERVICE_NAME, 'getTaskById')
  getTaskById(
    request: GetTaskByIdRequest,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    metadata?: Metadata, // we can send and receive authorization data here
  ): OneTaskResponse | Promise<OneTaskResponse> | Observable<OneTaskResponse> {
    throw new Error('Method not implemented.');
  }

  @GrpcMethod(TASK_SERVICE_NAME, 'deleteTask')
  deleteTask(
    request: DeleteTaskRequest,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    metadata?: Metadata, // we can send and receive authorization data here
  ):
    | DeleteTaskResponse
    | Observable<DeleteTaskResponse>
    | Promise<DeleteTaskResponse> {
    throw new Error('Method not implemented.');
  }

  @GrpcMethod(TASK_SERVICE_NAME, 'destroyTask')
  destroyTask(
    request: DestroyTaskRequest,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    metadata?: Metadata, // we can send and receive authorization data here
  ):
    | DeleteTaskResponse
    | Observable<DeleteTaskResponse>
    | Promise<DeleteTaskResponse> {
    throw new Error('Method not implemented.');
  }

  @GrpcMethod(TASK_SERVICE_NAME, 'getAllTasks')
  getAllTasks(
    request: GetAllTasksRequest,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    metadata?: Metadata, // we can send and receive authorization data here
  ):
    | GetAllTasksResponse
    | Observable<GetAllTasksResponse>
    | Promise<GetAllTasksResponse> {
    throw new Error('Method not implemented.');
  }
}
