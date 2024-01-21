import { Task } from 'infrastructure/interfaces';

export const task1Mock: Task = {
  id: 'c93d27f1-e16c-4ba7-880c-07458dfec7f9',
  title: 'task 1',
  description: 'task 1 description',
  parent_id: null,
  created_at: new Date().toString(),
  updated_at: new Date().toString(),
  deleted_at: null,
  sub_tasks: [],
};

export const allTasksResponseMock: Task[] = [
  {
    id: 'c93d27f1-e16c-4ba7-880c-07458dfec7f9',
    title: 'task 1',
    description: 'task 1 description',
    parent_id: null,
    created_at: new Date().toString(),
    updated_at: new Date().toString(),
    deleted_at: null,
    sub_tasks: [],
  },
  {
    id: 'c93d27f1-e16c-4ba7-880c-07458dfec7fa',
    title: 'task 2',
    description: 'task 2 description',
    parent_id: null,
    created_at: new Date().toString(),
    updated_at: new Date().toString(),
    deleted_at: null,
    sub_tasks: [],
  },
];