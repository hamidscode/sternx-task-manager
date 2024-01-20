/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "task";

export interface Meta {
  status: number;
  message?: string | undefined;
}

export interface Task {
  id: string;
  parentId?: string | undefined;
  title: string;
  description: string;
  createdAt: string;
  updatedAt?: string | undefined;
  subTasks: Task[];
}

export interface CreateTaskRequest {
  title: string;
  description: string;
  parentId?: string | undefined;
}

export interface CreateTaskResponse {
  meta: Meta | undefined;
  task?: Task | undefined;
}

export const TASK_PACKAGE_NAME = "task";

export interface TaskServiceClient {
  createTask(request: CreateTaskRequest, metadata?: Metadata): Observable<CreateTaskResponse>;
}

export interface TaskServiceController {
  createTask(
    request: CreateTaskRequest,
    metadata?: Metadata,
  ): Promise<CreateTaskResponse> | Observable<CreateTaskResponse> | CreateTaskResponse;
}

export function TaskServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["createTask"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("TaskService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("TaskService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const TASK_SERVICE_NAME = "TaskService";
