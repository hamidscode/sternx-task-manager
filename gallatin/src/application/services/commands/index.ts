import { CreateTaskCommandHandler } from './create-task';
import { UpdateTaskCommandHandler } from './update-task';
import { DeleteTaskCommandHandler } from './delete-task';
import { DestroyTaskCommandHandler } from './destroy-task';

export * from './create-task';
export * from './update-task';
export * from './delete-task';
export * from './destroy-task';

export const CommandHandlers = [
  CreateTaskCommandHandler,
  UpdateTaskCommandHandler,
  DeleteTaskCommandHandler,
  DestroyTaskCommandHandler,
];
