import { TaskModel } from 'domain/models';
import { SeedInterface } from '../interfaces';

export const taskSeed: SeedInterface<TaskModel> = {
  model: TaskModel,
  data: [
    {
      id: 'c93d27f1-e16c-4ba7-880c-07458dfec7f9',
      title: 'task 1',
      description: 'task 1 description',
      parent_id: null,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    },
    {
      id: 'c93d27f1-e16c-4ba7-880c-07458dfec7fa',
      title: 'task 1-1',
      description: 'task 1-1 description',
      parent_id: 'c93d27f1-e16c-4ba7-880c-07458dfec7f9',
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    },
    {
      id: 'c93d27f1-e16c-4ba7-880c-07458dfec7fb',
      title: 'task 1-2',
      description: 'task 1-2 description',
      parent_id: 'c93d27f1-e16c-4ba7-880c-07458dfec7f9',
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    },
    {
      id: 'c93d27f1-e16c-4ba7-880c-07458dfec7fc',
      title: 'task 2',
      description: 'task 2 description',
      parent_id: null,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    },
    {
      id: 'c93d27f1-e16c-4ba7-880c-07458dfec7fd',
      title: 'task 3',
      description: 'task 3 description',
      parent_id: null,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    },
  ],
};
