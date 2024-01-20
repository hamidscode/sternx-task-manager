import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { TaskEntity } from 'domain/models';
import { TaskRepository } from 'domain/services';
import { GetAllTasksWithTreeQuery } from './get-all-tasks-with-tree.query';
import { Op } from 'sequelize';
import { findAndCountAll } from 'infrastructure/database';

@QueryHandler(GetAllTasksWithTreeQuery)
export class GetAllTasksWithTreeQueryHandler
  implements
    IQueryHandler<GetAllTasksWithTreeQuery, findAndCountAll<TaskEntity>>
{
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute({
    query,
    pagination,
  }: GetAllTasksWithTreeQuery): Promise<findAndCountAll<TaskEntity>> {
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
    return this.taskRepository.findAllWithTree({
      where: {
        ...(query?.parentId
          ? { parent_id: query.parentId }
          : { parent_id: { [Op.eq]: null } }),
        ...(query?.title && { title: { [Op.like]: `%${query.title}%` } }),
      },
      limit: pagination.limit,
      offset: pagination.offset,
    });
  }
}
