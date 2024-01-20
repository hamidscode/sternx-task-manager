import { BaseEntity, BaseModel } from 'domain/models';
import { FilterType, findAndCountAll } from 'infrastructure/database';
import { Op, WhereOptions } from 'sequelize';
import { MapperInterface } from '../mappers';

export abstract class BaseRepository<
  ModelType extends BaseModel,
  EntityType extends BaseEntity,
> {
  constructor(
    private readonly baseModel: typeof BaseModel,
    private readonly mapper: MapperInterface<EntityType, ModelType>,
  ) {}

  async findOne(
    where: WhereOptions<EntityType>,
    fetchDeleted = false,
  ): Promise<EntityType> {
    const result = await this.baseModel.findOne({ where });

    if (result && !fetchDeleted && result.deletedAt) return null;

    return this.mapper.createEntityFromModel(result as ModelType);
  }

  async findOneById(id: string, fetchDeleted = false): Promise<EntityType> {
    const result = await this.baseModel.findByPk(id);

    if (!result || (result && !fetchDeleted && result.deletedAt)) return null;

    return this.mapper.createEntityFromModel(result as ModelType);
  }

  async findAll(
    filter: FilterType<ModelType>,
    fetchDeleted = false,
  ): Promise<findAndCountAll<EntityType>> {
    if (!filter.where) filter.where = {};

    if (!fetchDeleted) filter.where['deletedAt'] = { [Op.eq]: null };

    const result = await this.baseModel.findAndCountAll(filter);

    return {
      rows: result.rows.map((x) =>
        this.mapper.createEntityFromModel(x as ModelType),
      ),
      count: result.count,
    };
  }
}
