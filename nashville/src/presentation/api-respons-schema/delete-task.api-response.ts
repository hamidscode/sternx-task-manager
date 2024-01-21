import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export function DeleteTaskApiResponse() {
  return applyDecorators(
    ApiResponse({
      status: HttpStatus.OK,
      description: 'deleted task count',
      schema: {
        example: { deleted_task_count: 1 },
        type: 'object',
        required: ['deleted_task_count'],
        properties: {
          deleted_task_count: {
            type: 'number',
          },
        },
      },
    }),
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: 'task with provided id not found',
    }),
  );
}
