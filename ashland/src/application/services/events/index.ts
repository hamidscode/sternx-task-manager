import { CreateTaskEventHandler, CreateTaskEvent } from './create-task';

export * from './create-task';

export const EventHandlers = [CreateTaskEventHandler];
export const Events = { CreateTaskEvent };
