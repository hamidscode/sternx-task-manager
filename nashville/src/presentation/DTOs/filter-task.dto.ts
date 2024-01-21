import { IsBoolean, IsOptional, IsString, IsUUID } from 'class-validator';
import { PaginationDto } from './pagination.dto';
import { Type, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class FilterTaskDto extends PaginationDto {
  @ApiProperty({ type: String, required: false, example: 'update user' })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({
    type: String,
    required: false,
    description: 'id of parent task',
    example: 'f37fb146-0090-438b-a72b-8ad7e705a325',
  })
  @IsUUID()
  @IsOptional()
  parent_id?: string;

  @ApiProperty({
    type: Boolean,
    required: false,
    description:
      'if true the api ill return a hierarchy tree of tasks and sub tasks',
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  @Transform(
    ({ value }) => typeof value === 'string' && value.toLowerCase() === 'true',
  )
  include_sub_tasks?: boolean;
}
