import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export function DestroyTaskApiResponse() {
  return applyDecorators(
    ApiResponse({
      status: HttpStatus.OK,
      description: 'destroyed task count',
      schema: {
        example: { destroyed_task_count: 1 },
        type: 'object',
        required: ['destroyed_task_count'],
        properties: {
          destroyed_task_count: {
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
