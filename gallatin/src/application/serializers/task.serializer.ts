import { Task } from 'infrastructure/interfaces';
import { TaskEntity } from 'domain/models';

export class TaskSerializer implements Task {
  id: string;
  parent_id?: string | undefined;
  title: string;
  description: string;
  created_at: string;
  updated_at?: string | undefined;
  deleted_at?: string | undefined;
  sub_tasks: TaskSerializer[];

  constructor(taskEntity: TaskEntity) {
    this.id = taskEntity.id;
    this.parent_id = taskEntity?.parentId;
    this.title = taskEntity.title;
    this.description = taskEntity?.description;
    this.created_at = taskEntity.createdAt.toString();
    this.updated_at = taskEntity?.updatedAt?.toString();
    this.deleted_at = taskEntity?.deletedAt?.toString();
    if (taskEntity.subTasks?.length) {
      this.sub_tasks = taskEntity.subTasks.map((e) => new TaskSerializer(e));
    }
  }
}
