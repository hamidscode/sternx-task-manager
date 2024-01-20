import { TaskEntity } from 'domain/models';
export class UpdateTaskCommand {
  constructor(
    public readonly id: string,
    public readonly update: TaskEntity,
  ) {}
}
