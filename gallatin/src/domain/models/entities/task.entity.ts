import { BaseEntity } from './base.entity';

export class TaskEntity extends BaseEntity {
  parentId: string;
  title: string;
  description: string;

  sub_tasks?: TaskEntity[];

  parent?: TaskEntity;

  constructor(initial?: Partial<TaskEntity>) {
    super(initial);

    this.parentId = initial?.parentId;
    this.title = initial?.title;
    this.description = initial?.description;
  }
}
