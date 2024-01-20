import { Type } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TaskHierarchyTreeRequestDto {
  @ApiProperty({
    type: Boolean,
    required: false,
    description:
      'if true the api ill return a hierarchy tree of tasks and sub tasks',
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  include_sub_tasks?: boolean = true;
}
