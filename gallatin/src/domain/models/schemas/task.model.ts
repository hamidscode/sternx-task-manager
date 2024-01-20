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
} from 'sequelize-typescript';

@Table({
  tableName: 'tasks',
  timestamps: true,
})
export class TaskModel extends BaseModel {
  @ForeignKey(() => TaskModel)
  @AllowNull(false)
  @Index
  @Column(DataType.UUID)
  parent_id: string;

  @Index
  @Column(DataType.STRING(256))
  title?: string;

  @Column(DataType.TEXT)
  description?: string;

  @HasMany(() => TaskModel, 'id')
  sub_tasks: TaskModel[];

  @BelongsTo(() => TaskModel)
  parent: TaskModel;
}
