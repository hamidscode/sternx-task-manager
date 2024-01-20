import { IEvent } from '@nestjs/cqrs';
export class DestroyTaskEvent implements IEvent {
  constructor(public readonly id: string) {}
}
