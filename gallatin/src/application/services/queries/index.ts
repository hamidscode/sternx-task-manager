import { GetTaskByIdQueryHandler } from './get-task-by-id';
import { GetFullTaskByIdQueryHandler } from './get-full-task-by-id';
import { GetAllTasksQueryHandler } from './get-all-tasks';
import { GetAllTasksWithTreeQueryHandler } from './get-all-tasks-with-tree';

export * from './get-task-by-id';
export * from './get-full-task-by-id';
export * from './get-all-tasks';
export * from './get-all-tasks-with-tree';

export const QueryHandlers = [
  GetTaskByIdQueryHandler,
  GetFullTaskByIdQueryHandler,
  GetAllTasksQueryHandler,
  GetAllTasksWithTreeQueryHandler,
];
