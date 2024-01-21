import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export function GetTaskByIdApiResponse() {
  return applyDecorators(
    ApiResponse({
      status: HttpStatus.CREATED,
      description: 'created task',
      schema: {
        example: {
          id: 'ee4d6d13-f805-4839-a8af-dba57f0fbca2',
          parent_id: 'f69ff8e0-3703-4425-93d6-7fa3aabcd1a3',
          title: 'task 1',
          description: 'description',
          created_at: '2022-03-25T10:57:04.000Z',
          updated_at: '2022-03-25T10:57:04.000Z',
          sub_tasks: [
            {
              id: 'ee4d6d13-f805-4839-a8af-dba57f0fbfff',
              parent_id: 'ee4d6d13-f805-4839-a8af-dba57f0fbca2',
              title: 'task 11',
              description: 'description',
              created_at: '2022-03-25T10:57:04.000Z',
              updated_at: '2022-03-25T10:57:04.000Z',
            },
          ],
        },
        type: 'object',
        required: ['id', 'title', 'created_at'],
        properties: {
          id: {
            type: 'string',
          },
          parent_id: {
            type: 'string',
          },
          title: {
            type: 'string',
          },
          description: {
            type: 'string',
          },
          created_at: {
            type: 'string',
          },
          updated_at: {
            type: 'string',
          },
          sub_tasks: {
            type: 'array',
            items: {
              type: 'object',
              required: ['id', 'title', 'created_at'],
              properties: {
                id: {
                  type: 'string',
                },
                parent_id: {
                  type: 'string',
                },
                title: {
                  type: 'string',
                },
                description: {
                  type: 'string',
                },
                created_at: {
                  type: 'string',
                },
                updated_at: {
                  type: 'string',
                },
                sub_tasks: {
                  type: 'array',
                  items: {
                    type: 'object',
                  },
                },
              },
            },
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
