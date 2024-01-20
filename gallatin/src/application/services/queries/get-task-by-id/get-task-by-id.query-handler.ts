import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { TaskEntity } from 'domain/models';
import { TaskRepository } from 'domain/services';
import { GetTaskByIdQuery } from './get-task-by-id.query';

@QueryHandler(GetTaskByIdQuery)
export class GetTaskByIdQueryHandler
  implements IQueryHandler<GetTaskByIdQuery, TaskEntity>
{
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(query: GetTaskByIdQuery): Promise<TaskEntity> {
    return this.taskRepository.findOneById(query.id);
  }
}
