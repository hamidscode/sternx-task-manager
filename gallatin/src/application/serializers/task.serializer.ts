import { Task } from 'infrastructure/interfaces';
import { TaskEntity } from 'domain/models';

export class TaskSerializer implements Task {
  id: string;
  parentId?: string | undefined;
  title: string;
  description: string;
  createdAt: string;
  updatedAt?: string | undefined;
  deletedAt?: string | undefined;
  subTasks: TaskSerializer[];

  constructor(taskEntity: TaskEntity) {
    this.id = taskEntity.id;
    this.parentId = taskEntity?.parentId;
    this.title = taskEntity.title;
    this.description = taskEntity?.description;
    this.createdAt = taskEntity.createdAt.toString();
    this.updatedAt = taskEntity?.updatedAt?.toString();
    this.deletedAt = taskEntity?.deletedAt?.toString();
    if (taskEntity.subTasks?.length) {
      this.subTasks = taskEntity.subTasks.map((e) => new TaskSerializer(e));
    }
  }
}
