import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { BffModule } from 'bff.module';
import { initialApp } from './utils';
import { TaskController } from 'presentation/controllers';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let taskController: TaskController;

  beforeAll(async () => {
    app = await initialApp();
    taskController = app.get<TaskController>(TaskController);
  });

  it('/task/ (GET) get all tasks', () => {
    return request(app.getHttpServer())
      .get('/task/')
      .expect(200)
      .expect((res: request.Response) => {
        expect(res.body).toStrictEqual(
          expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(String),
              title: expect.any(String),
              description: expect.any(String),
              created_at: expect.any(String),
            }),
          ]),
        );
      });
  });

  it('/task/id (GET) get task by id', () => {
    return request(app.getHttpServer())
      .get('/task/c93d27f1-e16c-4ba7-880c-07458dfec7f9')
      .expect(200)
      .expect((res: request.Response) => {
        expect(res.body).toStrictEqual(
          expect.objectContaining({
            id: expect.any(String),
            title: expect.any(String),
            description: expect.any(String),
            created_at: expect.any(String),
          }),
        );
      });
  });

  it('/task/ (POST) create task', () => {
    return request(app.getHttpServer())
      .post('/task/')
      .send({
        title: 'task 1',
        description: 'task 1 description',
      })
      .expect(201)
      .expect((res: request.Response) => {
        expect(res.body).toStrictEqual(
          expect.objectContaining({
            id: expect.any(String),
            title: expect.any(String),
            description: expect.any(String),
            created_at: expect.any(String),
          }),
        );
      });
  });

  it('/task/id (PUT) update task by id', () => {
    return request(app.getHttpServer())
      .put('/task/c93d27f1-e16c-4ba7-880c-07458dfec7f9')
      .send({
        title: 'updated task 1',
        description: 'updated task 1 description',
      })
      .expect(200)
      .expect((res: request.Response) => {
        expect(res.body).toHaveProperty('updated_task_count');
        expect(res.body.updated_task_count).toBe(1);
      });
  });

  it('/task/id/delete (PATCH) delete task by id', () => {
    return request(app.getHttpServer())
      .patch('/task/c93d27f1-e16c-4ba7-880c-07458dfec7f9/delete')
      .expect(200)
      .expect((res: request.Response) => {
        expect(res.body).toHaveProperty('deleted_task_count');
        expect(res.body.deleted_task_count).toBe(1);
      });
  });

  it('/task/id/destroy (DELETE) destroy task by id', () => {
    return request(app.getHttpServer())
      .delete('/task/c93d27f1-e16c-4ba7-880c-07458dfec7f9/destroy')
      .expect(200)
      .expect((res: request.Response) => {
        expect(res.body).toHaveProperty('destroyed_task_count');
        expect(res.body.destroyed_task_count).toBe(1);
      });
  });
});
