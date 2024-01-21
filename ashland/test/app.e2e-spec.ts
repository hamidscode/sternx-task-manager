import { LoggerController } from 'presentation/controllers';
import { RmqContextMockInstance, rabbitMqAckMock } from './mock';
import {
  DestroyTaskEventHandler,
  DeleteTaskEventHandler,
  UpdateTaskEventHandler,
  CreateTaskEventHandler,
} from 'application/services/events';
import { RmqContext } from '@nestjs/microservices';
import { initialApp } from './utils';

describe('AppController (e2e)', () => {
  let loggerController: LoggerController;
  let destroyTaskEventHandler: DestroyTaskEventHandler;
  let deleteTaskEventHandler: DeleteTaskEventHandler;
  let updateTaskEventHandler: UpdateTaskEventHandler;
  let createTaskEventHandler: CreateTaskEventHandler;

  beforeEach(async () => {
    const initData = await initialApp();
    loggerController = initData.loggerController;
    destroyTaskEventHandler = initData.destroyTaskEventHandler;
    deleteTaskEventHandler = initData.deleteTaskEventHandler;
    updateTaskEventHandler = initData.updateTaskEventHandler;
    createTaskEventHandler = initData.createTaskEventHandler;
  });

  it('create task', () => {
    loggerController.eventBusHandler(
      { payload: {}, event: 'CreateTaskEvent' },
      RmqContextMockInstance as unknown as RmqContext,
    );
    expect(createTaskEventHandler.handle).toHaveBeenCalledTimes(1);
    expect(rabbitMqAckMock).toHaveBeenCalledTimes(1);
  });

  it('Update task', () => {
    loggerController.eventBusHandler(
      { payload: {}, event: 'UpdateTaskEvent' },
      RmqContextMockInstance as unknown as RmqContext,
    );
    expect(updateTaskEventHandler.handle).toHaveBeenCalledTimes(1);
    expect(rabbitMqAckMock).toHaveBeenCalledTimes(2);
  });

  it('delete task', () => {
    loggerController.eventBusHandler(
      { payload: {}, event: 'DeleteTaskEvent' },
      RmqContextMockInstance as unknown as RmqContext,
    );
    expect(deleteTaskEventHandler.handle).toHaveBeenCalledTimes(1);
    expect(rabbitMqAckMock).toHaveBeenCalledTimes(3);
  });

  it('destroy task', () => {
    loggerController.eventBusHandler(
      { payload: {}, event: 'DestroyTaskEvent' },
      RmqContextMockInstance as unknown as RmqContext,
    );
    expect(destroyTaskEventHandler.handle).toHaveBeenCalledTimes(1);
    expect(rabbitMqAckMock).toHaveBeenCalledTimes(4);
  });
});
