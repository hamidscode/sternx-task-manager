import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { TaskEntity, TaskModel } from 'domain/models';
import { TaskMapper } from '../mappers';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class TaskRepository extends BaseRepository<TaskModel, TaskEntity> {
  constructor(
    private readonly taskMapper: TaskMapper,
    @InjectModel(TaskModel)
    private readonly taskModel: typeof TaskModel,
  ) {
    super(taskModel, taskMapper);
  }
}
