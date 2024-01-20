import { IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskDto {
  @ApiProperty({ type: String, required: false, example: 'update user' })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({
    type: String,
    required: false,
    example: 'define GRPC interface for updating user data',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    type: String,
    required: false,
    description: 'id of parent task',
    example: 'f37fb146-0090-438b-a72b-8ad7e705a325',
  })
  @IsUUID()
  @IsOptional()
  parent_id?: string;
}
