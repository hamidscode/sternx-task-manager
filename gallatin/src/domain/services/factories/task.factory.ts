import { TaskEntity, TaskModel } from 'domain/models';
import { BaseFactory } from './base.factory';
import { TaskMapper } from '../mappers';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class TaskFactory extends BaseFactory<TaskModel, TaskEntity> {
  constructor(
    @InjectModel(TaskModel)
    private readonly taskModel: typeof TaskModel,
    private readonly taskMapper: TaskMapper,
  ) {
    super(taskModel, taskMapper);
  }
}
