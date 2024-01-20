import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { TaskEntity } from 'domain/models';
import { TaskRepository } from 'domain/services';
import { GetAllTasksQuery } from './get-all-tasks.query';
import { Op } from 'sequelize';
import { findAndCountAll } from 'infrastructure/database';

@QueryHandler(GetAllTasksQuery)
export class GetAllTasksQueryHandler
  implements IQueryHandler<GetAllTasksQuery, findAndCountAll<TaskEntity>>
{
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute({
    query,
    pagination,
  }: GetAllTasksQuery): Promise<findAndCountAll<TaskEntity>> {
    if (!pagination) {
      pagination = {};
    }
    if (!pagination?.limit) {
      pagination.limit = 10;
    }
    if (pagination.limit > 100) {
      pagination.limit = 100;
    }
    if (!pagination?.offset) {
      pagination.offset = 0;
    }
    return this.taskRepository.findAll({
      where: {
        ...(query?.parentId && { parent_id: query.parentId }),
        ...(query?.title && { title: { [Op.like]: `%${query.title}%` } }),
      },
      limit: pagination.limit,
      offset: pagination.offset,
    });
  }
}
