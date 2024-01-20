import { BaseModel } from './base.model';
import {
  AllowNull,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  BelongsTo,
  Index,
  Table,
  Default,
} from 'sequelize-typescript';

@Table({
  tableName: 'tasks',
  timestamps: true,
})
export class TaskModel extends BaseModel {
  @ForeignKey(() => TaskModel)
  @AllowNull(true)
  @Index
  @Column(DataType.UUID)
  parent_id?: string;

  @AllowNull(false)
  @Index
  @Column(DataType.STRING(256))
  title: string;

  @AllowNull(true)
  @Default('')
  @Column(DataType.TEXT)
  description?: string;

  @HasMany(() => TaskModel, 'parent_id')
  sub_tasks?: TaskModel[];

  @BelongsTo(() => TaskModel, 'parent_id')
  parent?: TaskModel;
}
