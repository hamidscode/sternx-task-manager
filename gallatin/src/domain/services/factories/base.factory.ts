import { BaseEntity, BaseModel } from 'domain/models';
import { MapperInterface } from '../mappers';
import { Op, WhereOptions } from 'sequelize';

export abstract class BaseFactory<
  ModelType extends BaseModel,
  EntityType extends BaseEntity,
> {
  constructor(
    private readonly baseModel: typeof BaseModel,
    private readonly mapper: MapperInterface<EntityType, ModelType>,
  ) {}

  async create(entity: EntityType): Promise<EntityType> {
    const model = this.mapper.createModelFromEntity(entity);

    const newModel = await model.save();

    return this.mapper.createEntityFromModel(newModel as ModelType);
  }

  async updateOne(
    entity: Partial<EntityType>,
    where: WhereOptions<EntityType>,
  ): Promise<[affectedCount: number]> {
    const model = this.mapper.createModelFromEntity(entity as EntityType);
    Object.keys(model.dataValues).forEach(
      (key) =>
        model.dataValues[key] === undefined && delete model.dataValues[key],
    );

    return this.baseModel.update({ ...model.dataValues }, { where });
  }

  async deleteOne(id: string): Promise<[affectedCount: number]> {
    return this.baseModel.update(
      { deletedAt: new Date() },
      {
        where: {
          deletedAt: { [Op.eq]: null },
          id,
        },
      },
    );
  }

  async destroyOne(id: string): Promise<number> {
    return this.baseModel.destroy({ where: { id } });
  }
}
