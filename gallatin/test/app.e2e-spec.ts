import { HttpStatus, INestApplication } from '@nestjs/common';
import { initialApp, loadDbUtil, clearDbUtil } from './utils';
import { Metadata } from '@grpc/grpc-js';
import { TaskController } from 'presentation/controllers';

describe('task-manager TaskController (e2e)', () => {
  let app: INestApplication;
  let taskController: TaskController;

  let newCreatedTaskId = '';

  beforeAll(async () => {
    app = await initialApp();
    await loadDbUtil(app);
    taskController = app.get<TaskController>(TaskController);
  });

  afterAll(async () => {
    await clearDbUtil(app);
    await app.close();
  });

  it('get task by id', async () => {
    const metadata = new Metadata();
    const response = await taskController.getTaskById(
      { id: 'c93d27f1-e16c-4ba7-880c-07458dfec7f9' },
      metadata,
    );
    expect(response.meta?.status).toBe(HttpStatus.OK);
    expect(response.task).toHaveProperty('id');
    expect(response.task).toHaveProperty('title');
    expect(response.task).toHaveProperty('description');
    expect(response.task).toHaveProperty('created_at');
    expect(response.task.sub_tasks).toBeUndefined();
  });

  it('get task by id including sub tasks', async () => {
    const metadata = new Metadata();
    const response = await taskController.getTaskById(
      { id: 'c93d27f1-e16c-4ba7-880c-07458dfec7f9', include_sub_tasks: true },
      metadata,
    );
    expect(response.meta?.status).toBe(HttpStatus.OK);

    expect(response.task).toHaveProperty('id');
    expect(response.task).toHaveProperty('title');
    expect(response.task).toHaveProperty('description');
    expect(response.task).toHaveProperty('created_at');

    expect(response.task.sub_tasks).toStrictEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          parent_id: 'c93d27f1-e16c-4ba7-880c-07458dfec7f9',
          title: expect.any(String),
          created_at: expect.any(String),
        }),
      ]),
    );
  });

  it('create task', async () => {
    const metadata = new Metadata();
    const response = await taskController.createTask(
      {
        title: 'test task 1',
        description: 'test task 1 description',
      },
      metadata,
    );
    expect(response.meta?.status).toBe(HttpStatus.CREATED);

    expect(response.task).toHaveProperty('id');
    expect(response.task).toHaveProperty('title');
    expect(response.task).toHaveProperty('description');
    expect(response.task).toHaveProperty('created_at');
    expect(response.task.parent_id).toBeNull();
    expect(response.task.sub_tasks).toBeUndefined();

    newCreatedTaskId = response.task.id;
  });

  it('test new created task', async () => {
    const metadata = new Metadata();
    const response = await taskController.getTaskById(
      { id: newCreatedTaskId },
      metadata,
    );
    expect(response.meta?.status).toBe(HttpStatus.OK);
    expect(response.task).toHaveProperty('id');
    expect(response.task.id).toBe(newCreatedTaskId);
    expect(response.task).toHaveProperty('title');
    expect(response.task).toHaveProperty('description');
    expect(response.task).toHaveProperty('created_at');
    expect(response.task.sub_tasks).toBeUndefined();
  });

  it('update task', async () => {
    const metadata = new Metadata();
    const response = await taskController.updateTask(
      {
        id: newCreatedTaskId,
        update: {
          title: 'updated test task 1',
          parent_id: 'c93d27f1-e16c-4ba7-880c-07458dfec7f9',
        },
      },
      metadata,
    );
    expect(response.meta?.status).toBe(HttpStatus.OK);
    expect(response.affected_row_count).toBe(1);
  });

  it('test updated id', async () => {
    const metadata = new Metadata();
    const response = await taskController.getTaskById(
      { id: newCreatedTaskId },
      metadata,
    );
    expect(response.meta?.status).toBe(HttpStatus.OK);
    expect(response.task).toHaveProperty('id');
    expect(response.task).toHaveProperty('title');
    expect(response.task).toHaveProperty('updated_at');
    expect(response.task).toHaveProperty('parent_id');
    expect(response.task.parent_id).toBe(
      'c93d27f1-e16c-4ba7-880c-07458dfec7f9',
    );
    expect(response.task.sub_tasks).toBeUndefined();
  });

  it('search task using updated task title', async () => {
    const metadata = new Metadata();
    const response = await taskController.getAllTasks(
      { query: { title: 'updated test task 1' } },
      metadata,
    );
    expect(response.meta?.status).toBe(HttpStatus.OK);
    expect(response.tasks).toHaveLength(1);
    expect(response.tasks[0].title).toBe('updated test task 1');
  });

  it('delete task', async () => {
    const metadata = new Metadata();
    const response = await taskController.deleteTask(
      { id: newCreatedTaskId },
      metadata,
    );
    expect(response.meta?.status).toBe(HttpStatus.OK);
    expect(response.affected_row_count).toBe(1);
  });

  it('destroy task', async () => {
    const metadata = new Metadata();
    const response = await taskController.destroyTask(
      { id: newCreatedTaskId },
      metadata,
    );
    expect(response.meta?.status).toBe(HttpStatus.NOT_FOUND);
  });

  it('destroy task', async () => {
    const metadata = new Metadata();
    const response = await taskController.destroyTask(
      { id: 'c93d27f1-e16c-4ba7-880c-07458dfec7fd' },
      metadata,
    );
    expect(response.meta?.status).toBe(HttpStatus.OK);
    expect(response.destroyed_row_count).toBe(1);
  });
});
