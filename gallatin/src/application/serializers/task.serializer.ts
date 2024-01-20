import { Task } from 'infrastructure/interfaces';

export class TaskSerializer implements Task {
  id: string;
  parentId?: string | undefined;
  title: string;
  description: string;
  createdAt: string;
  updatedAt?: string | undefined;
  subTasks: Task[];

  constructor(taskEntity: Task) {
    this.id = taskEntity.id;
    this.parentId = taskEntity.parentId;
    this.title = taskEntity.title;
    this.description = taskEntity.description;
    this.createdAt = taskEntity.createdAt;
    this.updatedAt = taskEntity.updatedAt;
    if (taskEntity.subTasks?.length) {
      this.subTasks = taskEntity.subTasks.map((e) => new TaskSerializer(e));
    }
  }
}
