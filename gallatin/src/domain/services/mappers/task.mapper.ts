import { Injectable } from '@nestjs/common';
import { BaseMapper } from './base.mapper';
import { TaskEntity, TaskModel } from 'domain/models';
import { MapperInterface } from 'domain/services/mappers/mapper.interface';
import {
  CreateTaskRequest,
  UpdateTaskRequest_UpdateData,
} from 'infrastructure/interfaces';

@Injectable()
export class TaskMapper
  extends BaseMapper
  implements MapperInterface<TaskEntity, TaskModel>
{
  createEntityFromModel(model: TaskModel): TaskEntity {
    return TaskMapper.createEntityFromModel(model);
  }
  createModelFromEntity(entity: TaskEntity): TaskModel {
    return TaskMapper.createModelFromEntity(entity);
  }
  private static createEntityFromModel(model: TaskModel): TaskEntity {
    const taskEntity = BaseMapper.createBaseEntityFromModel(model, TaskEntity);

    taskEntity.parentId = model.parent_id;
    taskEntity.title = model.title;
    taskEntity.description = model.description;
    if (model.sub_tasks)
      taskEntity.subTasks = model.sub_tasks.map((x) =>
        TaskMapper.createEntityFromModel(x),
      );
    if (model.parent)
      taskEntity.parent = TaskMapper.createEntityFromModel(model.parent);

    return taskEntity;
  }

  private static createModelFromEntity(entity: TaskEntity): TaskModel {
    const taskModel = BaseMapper.createBaseModelFromEntity(entity, TaskModel);

    taskModel.parent_id = entity.parentId;
    taskModel.title = entity.title;
    taskModel.description = entity.description;

    if (entity.subTasks)
      taskModel.sub_tasks = entity.subTasks.map((x) =>
        TaskMapper.createModelFromEntity(x),
      );
    if (entity.parent)
      taskModel.parent = TaskMapper.createModelFromEntity(entity.parent);

    return taskModel;
  }

  convertRequestToEntity(
    request:
      | CreateTaskRequest
      | (UpdateTaskRequest_UpdateData & { id: string }),
  ): TaskEntity {
    const entity = new TaskEntity();
    console.log(request);
    if ('id' in request) {
      console.log('id in request');
      entity.id = request.id;
    }
    console.log(entity.id);
    entity.title = request?.title;
    entity.description = request?.description;
    entity.parentId = request?.parentId;
    return entity;
  }
}
