import { INestApplication } from '@nestjs/common';
import { getConnectionToken, getModelToken } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import * as seeds from '../seeds';

export const dropDbUtil = async (app: INestApplication) => {
  const sequelizeConnection = app.get<Sequelize>(getConnectionToken());

  await sequelizeConnection.drop();
};

export const clearDbUtil = async (app: INestApplication) => {
  for (const index in seeds) {
    const seed = seeds[index];
    const model = app.get(getModelToken(seed.model));

    await model.destroy({ truncate: true });
  }
};
