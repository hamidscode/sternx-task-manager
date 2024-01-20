import { Task } from 'infrastructure/interfaces';

export class CreateTaskEvent {
  constructor(public readonly task: Task) {}
}
