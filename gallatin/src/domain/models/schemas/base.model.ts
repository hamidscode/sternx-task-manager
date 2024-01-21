import {
  AllowNull,
  Column,
  CreatedAt,
  DataType,
  Index,
  Model,
  PrimaryKey,
  UpdatedAt,
  Default,
} from 'sequelize-typescript';


export class BaseModel extends Model {
  @PrimaryKey
  @AllowNull(false)
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @CreatedAt
  @Index
  @Column(DataType.DATE)
  created_at: Date;

  @AllowNull
  @UpdatedAt
  @Column(DataType.DATE)
  updated_at?: Date;

  @AllowNull
  @Column(DataType.DATE)
  deleted_at?: Date;
}
