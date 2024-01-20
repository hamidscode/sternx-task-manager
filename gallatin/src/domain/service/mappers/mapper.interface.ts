export interface MapperInterface<EntityType, ModelType> {
  createEntityFromModel(model: ModelType): EntityType;
  createModelFromEntity(entity: EntityType): ModelType;
}
