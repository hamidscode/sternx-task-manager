import { allTasksResponseMock, task1Mock } from './grpc-responses.mock';
export const GallatinGrpcProxyMock = jest.fn();
GallatinGrpcProxyMock.prototype.getTaskById = jest
  .fn()
  .mockReturnValue(task1Mock);
GallatinGrpcProxyMock.prototype.getAllTasks = jest
  .fn()
  .mockReturnValue(allTasksResponseMock);
GallatinGrpcProxyMock.prototype.createTask = jest
  .fn()
  .mockReturnValue(task1Mock);
GallatinGrpcProxyMock.prototype.updateTask = jest.fn().mockReturnValue(1);
GallatinGrpcProxyMock.prototype.deleteTask = jest.fn().mockReturnValue(1);
GallatinGrpcProxyMock.prototype.destroyTask = jest.fn().mockReturnValue(1);
