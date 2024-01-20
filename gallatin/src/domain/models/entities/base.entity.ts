import { AggregateRoot } from '@nestjs/cqrs';

export class BaseEntity extends AggregateRoot {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;

  constructor(initial?: Partial<BaseEntity>) {
    super();
    Object.assign(this, initial);
  }
}
