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
  parent_id?: string | undefined;
  title: string;
  description: string;
  created_at: string;
  updated_at?: string | undefined;
  deleted_at?: string | undefined;
  sub_tasks: Task[];
}

export interface CreateTaskRequest {
  title: string;
  description?: string | undefined;
  parent_id?: string | undefined;
}

export interface OneTaskResponse {
  meta: Meta | undefined;
  task?: Task | undefined;
}

export interface GetTaskByIdRequest {
  id: string;
  include_sub_tasks?: boolean | undefined;
}

export interface UpdateTaskRequest {
  id: string;
  update: UpdateTaskRequest_UpdateData | undefined;
}

export interface UpdateTaskRequest_UpdateData {
  title?: string | undefined;
  description?: string | undefined;
  parent_id?: string | undefined;
}

export interface UpdateTaskResponse {
  meta: Meta | undefined;
  affected_row_count?: number | undefined;
}

export interface DeleteTaskRequest {
  id: string;
}

export interface DestroyTaskRequest {
  id: string;
}

export interface DestroyTaskResponse {
  meta: Meta | undefined;
  destroyed_row_count?: number | undefined;
}

export interface GetAllTasksRequest {
  pagination?: GetAllTasksRequest_Pagination | undefined;
  query?: GetAllTasksRequest_Query | undefined;
  include_sub_tasks?: boolean | undefined;
}

export interface GetAllTasksRequest_Pagination {
  limit?: number | undefined;
  offset?: number | undefined;
}

export interface GetAllTasksRequest_Query {
  title?: string | undefined;
  parent_id?: string | undefined;
}

export interface GetAllTasksResponse {
  meta: Meta | undefined;
  tasks: Task[];
}

export const TASK_PACKAGE_NAME = "task";

export interface TaskServiceClient {
  createTask(request: CreateTaskRequest, metadata?: Metadata): Observable<OneTaskResponse>;

  getTaskById(request: GetTaskByIdRequest, metadata?: Metadata): Observable<OneTaskResponse>;

  updateTask(request: UpdateTaskRequest, metadata?: Metadata): Observable<UpdateTaskResponse>;

  deleteTask(request: DeleteTaskRequest, metadata?: Metadata): Observable<UpdateTaskResponse>;

  destroyTask(request: DestroyTaskRequest, metadata?: Metadata): Observable<DestroyTaskResponse>;

  getAllTasks(request: GetAllTasksRequest, metadata?: Metadata): Observable<GetAllTasksResponse>;
}

export interface TaskServiceController {
  createTask(
    request: CreateTaskRequest,
    metadata?: Metadata,
  ): Promise<OneTaskResponse> | Observable<OneTaskResponse> | OneTaskResponse;

  getTaskById(
    request: GetTaskByIdRequest,
    metadata?: Metadata,
  ): Promise<OneTaskResponse> | Observable<OneTaskResponse> | OneTaskResponse;

  updateTask(
    request: UpdateTaskRequest,
    metadata?: Metadata,
  ): Promise<UpdateTaskResponse> | Observable<UpdateTaskResponse> | UpdateTaskResponse;

  deleteTask(
    request: DeleteTaskRequest,
    metadata?: Metadata,
  ): Promise<UpdateTaskResponse> | Observable<UpdateTaskResponse> | UpdateTaskResponse;

  destroyTask(
    request: DestroyTaskRequest,
    metadata?: Metadata,
  ): Promise<DestroyTaskResponse> | Observable<DestroyTaskResponse> | DestroyTaskResponse;

  getAllTasks(
    request: GetAllTasksRequest,
    metadata?: Metadata,
  ): Promise<GetAllTasksResponse> | Observable<GetAllTasksResponse> | GetAllTasksResponse;
}

export function TaskServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "createTask",
      "getTaskById",
      "updateTask",
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
