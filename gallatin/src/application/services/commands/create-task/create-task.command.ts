import { TaskEntity } from 'domain/models';
export class CreateTaskCommand {
  constructor(public readonly task: TaskEntity) {}
}
