import { BaseModel } from 'domain/models';
export interface SeedInterface<T extends BaseModel> {
  model: new () => T;
  data: Partial<T>[];
}
