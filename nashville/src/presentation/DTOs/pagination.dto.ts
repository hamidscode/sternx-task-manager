import { Type } from 'class-transformer';
import { IsNumber, IsOptional, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto {
  @ApiProperty({ type: Number, required: false, example: 0, default: 0 })
  @IsNumber()
  @Min(1)
  @IsOptional()
  @Type(() => Number)
  offset: number = 0;

  @ApiProperty({ type: Number, required: false, example: 10, default: 10 })
  @IsNumber()
  @Min(1)
  @IsOptional()
  @Type(() => Number)
  limit: number = 10;
}
