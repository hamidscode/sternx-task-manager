import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { TaskEntity, TaskModel } from 'domain/models';
import { TaskMapper } from '../mappers';
import { InjectModel } from '@nestjs/sequelize';
import { FilterType, findAndCountAll } from 'infrastructure/database';

@Injectable()
export class TaskRepository extends BaseRepository<TaskModel, TaskEntity> {
  constructor(
    private readonly taskMapper: TaskMapper,
    @InjectModel(TaskModel)
    private readonly taskModel: typeof TaskModel,
  ) {
    super(taskModel, taskMapper);
  }
  private async getHierarchyTree(
    taskId?: string,
    fetchDeleted: boolean = false,
  ): Promise<TaskEntity[]> {
    const tasks = (
      await this.findAll(
        {
          where: { parent_id: taskId },
          order: [['id', 'ASC']],
        },
        fetchDeleted,
      )
    ).rows;

    const result: TaskEntity[] = [];

    const fetchChildren = async (parent: TaskEntity) => {
      const children = await this.getHierarchyTree(parent.id);
      if (children.length > 0) {
        parent.subTasks = children;
      }
    };

    await Promise.all(
      tasks.map(async (task) => {
        await fetchChildren(task);
        result.push(task);
      }),
    );

    return result;
  }

  async findOneWithTreeById(
    id: string,
    fetchDeleted: boolean = false,
  ): Promise<TaskEntity> {
    const task = await super.findOneById(id, fetchDeleted);
    if (task) task.subTasks = await this.getHierarchyTree(task.id);
    return task;
  }

  async findAllWithTree(
    filter: FilterType<TaskModel>,
    fetchDeleted = false,
  ): Promise<findAndCountAll<TaskEntity>> {
    const tasks = await super.findAll(filter, fetchDeleted);
    for (let i = 0; i < tasks?.rows?.length; i++) {
      tasks.rows[i].subTasks = await this.getHierarchyTree(tasks.rows[i].id);
    }
    return tasks;
  }
}
