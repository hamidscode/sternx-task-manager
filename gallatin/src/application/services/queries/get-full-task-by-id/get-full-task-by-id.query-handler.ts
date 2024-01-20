import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { TaskEntity } from 'domain/models';
import { TaskRepository } from 'domain/services';
import { GetFullTaskByIdQuery } from './get-full-task-by-id.query';

@QueryHandler(GetFullTaskByIdQuery)
export class GetFullTaskByIdQueryHandler
  implements IQueryHandler<GetFullTaskByIdQuery, TaskEntity>
{
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(query: GetFullTaskByIdQuery): Promise<TaskEntity> {
    // return this.taskRepository.findOne({
    //   where: {
    //     id: query.id,
    //   },
    //   include: [
    //     {
    //       model: TaskModel,
    //       as: 'sub_tasks',
    //       include: [
    //         {
    //           model: TaskModel,
    //           as: 'sub_tasks',
    //           nested: true,
    //         },
    //       ],
    //     },
    //   ],
    // });
    return this.taskRepository.findOneWithTreeById(query.id);
  }
}
