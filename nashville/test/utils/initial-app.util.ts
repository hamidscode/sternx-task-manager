import { Test, TestingModule } from '@nestjs/testing';
import { BffModule } from 'bff.module';
import { GallatinProxy } from 'application/services/proxies';
import { GallatinGrpcProxyMock } from '../mocks';

export const initialApp = async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [BffModule],
  })
    .overrideProvider(GallatinProxy)
    .useClass(GallatinGrpcProxyMock)
    .compile();

  const app = moduleFixture.createNestApplication();
  await app.init();
  return app;
};
