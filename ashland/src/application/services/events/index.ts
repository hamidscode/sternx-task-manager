import { CreateTaskEventHandler, CreateTaskEvent } from './create-task';
import { UpdateTaskEventHandler, UpdateTaskEvent } from './update-task';
import { DeleteTaskEventHandler, DeleteTaskEvent } from './delete-task';
import { DestroyTaskEventHandler, DestroyTaskEvent } from './destroy-task';

export * from './create-task';
export * from './update-task';
export * from './delete-task';
export * from './destroy-task';

export const EventHandlers = [
  CreateTaskEventHandler,
  UpdateTaskEventHandler,
  DeleteTaskEventHandler,
  DestroyTaskEventHandler,
];
export const Events = {
  CreateTaskEvent,
  UpdateTaskEvent,
  DestroyTaskEvent,
  DeleteTaskEvent,
};
