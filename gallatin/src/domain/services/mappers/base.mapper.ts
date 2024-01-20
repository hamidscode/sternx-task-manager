import { BaseEntity, BaseModel } from 'domain/models';

export class BaseMapper {
  protected static createBaseEntityFromModel<
    EntityType extends BaseEntity,
    ModelType extends BaseModel,
  >(model: ModelType, type: new () => EntityType): EntityType {
    const entity = new type();

    entity.id = model.id;
    entity.updatedAt = model.updated_at;
    entity.createdAt = model.created_at;
    entity.deletedAt = model.deleted_at;

    return entity;
  }

  protected static createBaseModelFromEntity<
    EntityType extends BaseEntity,
    ModelType extends BaseModel,
  >(entity: EntityType, type: new () => ModelType): ModelType {
    const model = new type();
    model.id = entity.id;
    model.created_at = entity.createdAt;
    model.updated_at = entity.updatedAt;
    model.deleted_at = entity.deletedAt;

    return model;
  }
}
