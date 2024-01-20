import { TaskEntity } from 'domain/models';
import { IEvent } from '@nestjs/cqrs';
export class UpdateTaskEvent implements IEvent {
  constructor(public readonly task: TaskEntity) {}
}
