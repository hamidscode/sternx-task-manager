import { INestApplication } from '@nestjs/common';
import * as seeds from '../seeds';
import { getModelToken } from '@nestjs/sequelize';

export const loadDbUtil = async (app: INestApplication) => {
  for (const index in seeds) {
    const seed = seeds[index];
    const model = app.get(getModelToken(seed.model));

    await model.bulkCreate(seed.data);
  }
};
