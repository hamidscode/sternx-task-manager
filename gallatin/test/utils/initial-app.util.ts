import { Test, TestingModule } from '@nestjs/testing';
import { TaskManagerModule } from 'task-manager.module';
import { RabbitPublisher } from 'application/services/proxies';
import { rabbitMqEmitMock } from '../mocks';

export const initialApp = async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [TaskManagerModule],
  })
    .overrideProvider(RabbitPublisher)
    .useClass(rabbitMqEmitMock)
    .compile();

  const app = moduleFixture.createNestApplication();
  await app.init();
  return app;
};
