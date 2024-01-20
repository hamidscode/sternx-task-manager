import { TaskEntity } from 'domain/models';
import { IEvent } from '@nestjs/cqrs';
export class CreateTaskEvent implements IEvent {
  constructor(public readonly task: TaskEntity) {}
}
