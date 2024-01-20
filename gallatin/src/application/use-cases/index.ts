import { CreateTaskUseCase } from './create-task.use-case';
import { ManageTasksUseCase } from './manage-tasks.use-case';
import { FetchTaskUseCase } from './fetch-task.use-case';

export * from './create-task.use-case';
export * from './manage-tasks.use-case';
export * from './fetch-task.use-case';

export const UseCases = [
  CreateTaskUseCase,
  ManageTasksUseCase,
  FetchTaskUseCase,
];
