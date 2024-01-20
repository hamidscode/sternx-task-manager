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

export interface OneTaskResponse {
  meta: Meta | undefined;
  task?: Task | undefined;
}

export interface UpdateTaskRequest {
  id: string;
  update: UpdateTaskRequest_UpdateData | undefined;
}

export interface UpdateTaskRequest_UpdateData {
  title?: string | undefined;
  description?: string | undefined;
  parentId?: string | undefined;
}

export interface GetTaskByIdRequest {
  id: string;
}

export interface DeleteTaskRequest {
  id: string;
}

export interface DestroyTaskRequest {
  id: string;
}

export interface DeleteTaskResponse {
  meta: Meta | undefined;
}

export interface GetAllTasksRequest {
  pagination?: GetAllTasksRequest_Pagination | undefined;
  query?: GetAllTasksRequest_Query | undefined;
}

export interface GetAllTasksRequest_Pagination {
  limit?: number | undefined;
  offset?: number | undefined;
}

export interface GetAllTasksRequest_Query {
  title?: string | undefined;
  parentId?: string | undefined;
}

export interface GetAllTasksResponse {
  meta: Meta | undefined;
  tasks: Task[];
}

export const TASK_PACKAGE_NAME = "task";

export interface TaskServiceClient {
  createTask(request: CreateTaskRequest, metadata?: Metadata): Observable<OneTaskResponse>;

  updateTask(request: UpdateTaskRequest, metadata?: Metadata): Observable<OneTaskResponse>;

  getTaskById(request: GetTaskByIdRequest, metadata?: Metadata): Observable<OneTaskResponse>;

  deleteTask(request: DeleteTaskRequest, metadata?: Metadata): Observable<DeleteTaskResponse>;

  destroyTask(request: DestroyTaskRequest, metadata?: Metadata): Observable<DeleteTaskResponse>;

  getAllTasks(request: GetAllTasksRequest, metadata?: Metadata): Observable<GetAllTasksResponse>;
}

export interface TaskServiceController {
  createTask(
    request: CreateTaskRequest,
    metadata?: Metadata,
  ): Promise<OneTaskResponse> | Observable<OneTaskResponse> | OneTaskResponse;

  updateTask(
    request: UpdateTaskRequest,
    metadata?: Metadata,
  ): Promise<OneTaskResponse> | Observable<OneTaskResponse> | OneTaskResponse;

  getTaskById(
    request: GetTaskByIdRequest,
    metadata?: Metadata,
  ): Promise<OneTaskResponse> | Observable<OneTaskResponse> | OneTaskResponse;

  deleteTask(
    request: DeleteTaskRequest,
    metadata?: Metadata,
  ): Promise<DeleteTaskResponse> | Observable<DeleteTaskResponse> | DeleteTaskResponse;

  destroyTask(
    request: DestroyTaskRequest,
    metadata?: Metadata,
  ): Promise<DeleteTaskResponse> | Observable<DeleteTaskResponse> | DeleteTaskResponse;

  getAllTasks(
    request: GetAllTasksRequest,
    metadata?: Metadata,
  ): Promise<GetAllTasksResponse> | Observable<GetAllTasksResponse> | GetAllTasksResponse;
}

export function TaskServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "createTask",
      "updateTask",
      "getTaskById",
      "deleteTask",
      "destroyTask",
      "getAllTasks",
    ];
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
