import { IEvent } from '@nestjs/cqrs';
import { Task } from 'infrastructure/interfaces';
export class UpdateTaskEvent implements IEvent {
  constructor(public readonly task: Partial<Task>) {}
}
