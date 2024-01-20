import {
  GetAllTasksRequest_Pagination,
  GetAllTasksRequest_Query,
} from 'infrastructure/interfaces';

export class GetAllTasksWithTreeQuery {
  constructor(
    public readonly query: GetAllTasksRequest_Query,
    public readonly pagination: GetAllTasksRequest_Pagination,
  ) {}
}
