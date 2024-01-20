import { IEvent } from '@nestjs/cqrs';
export class DeleteTaskEvent implements IEvent {
  constructor(public readonly id: string) {}
}
