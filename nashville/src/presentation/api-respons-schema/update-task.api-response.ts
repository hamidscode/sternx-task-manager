import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export function UpdateTaskApiResponse() {
  return applyDecorators(
    ApiResponse({
      status: HttpStatus.OK,
      description: 'updated task count',
      schema: {
        example: { updated_task_count: 1 },
        type: 'object',
        required: ['updated_task_count'],
        properties: {
          updated_task_count: {
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
