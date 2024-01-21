import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { LoggerModule } from 'logger.module';
import { LoggerController } from 'presentation/controllers';
import {
  CreateTaskEventHandler,
  DeleteTaskEventHandler,
  DestroyTaskEventHandler,
  UpdateTaskEventHandler,
} from 'application/services';

export const initialApp = async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [LoggerModule],
  }).compile();

  const app: INestApplication = moduleFixture.createNestApplication();
  const loggerController = app.get<LoggerController>(LoggerController);
  const destroyTaskEventHandler = app.get<DestroyTaskEventHandler>(
    DestroyTaskEventHandler,
  );
  const deleteTaskEventHandler = app.get<DeleteTaskEventHandler>(
    DeleteTaskEventHandler,
  );
  const updateTaskEventHandler = app.get<UpdateTaskEventHandler>(
    UpdateTaskEventHandler,
  );
  const createTaskEventHandler = app.get<CreateTaskEventHandler>(
    CreateTaskEventHandler,
  );
  createTaskEventHandler.handle = jest.fn();
  updateTaskEventHandler.handle = jest.fn();
  deleteTaskEventHandler.handle = jest.fn();
  destroyTaskEventHandler.handle = jest.fn();
  await app.init();
  return {
    app,
    createTaskEventHandler,
    updateTaskEventHandler,
    deleteTaskEventHandler,
    destroyTaskEventHandler,
    loggerController,
  };
};
