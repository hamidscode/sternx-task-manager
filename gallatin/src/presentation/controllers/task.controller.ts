import { Metadata } from '@grpc/grpc-js';
import { HttpStatus, Logger } from '@nestjs/common';
import { GrpcMethod, GrpcService } from '@nestjs/microservices';
import {
  CreateTaskRequest,
  CreateTaskResponse,
  Meta,
  TASK_SERVICE_NAME,
  TaskServiceController,
} from 'infrastructure/interfaces';
import { CreateTaskUseCase } from 'application/use-cases';

@GrpcService(TASK_SERVICE_NAME)
export class TaskController
  implements Pick<TaskServiceController, 'createTask'>
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
  ): Promise<CreateTaskResponse> {
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
}
