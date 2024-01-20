import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Put,
  Patch,
  Post,
  Delete,
  Query,
  HttpException,
} from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import {
  CreateTaskDto,
  UpdateTaskDto,
  FilterTaskDto,
  TaskHierarchyTreeRequestDto,
} from 'presentation/DTOs';
import { GallatinProxy } from 'application/services';

@ApiTags('task-manager')
@Controller('/task')
export class TaskController {
  constructor(private readonly gallatinProxy: GallatinProxy) {}
  @Get('/')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'created task',
    schema: {
      example: [
        {
          id: 'ee4d6d13-f805-4839-a8af-dba57f0fbca2',
          parent_id: 'f69ff8e0-3703-4425-93d6-7fa3aabcd1a3',
          title: 'task 1',
          description: 'description',
          created_at: '2022-03-25T10:57:04.000Z',
          updated_at: '2022-03-25T10:57:04.000Z',
          sub_tasks: [
            { id: 'ee4d6d13-f805-4839-a8af-dba57f0fbca2' },
            { id: 'ee4d6d13-f805-4839-a8af-dba57f0fbca2' },
          ],
        },
      ],
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          parent_id: { type: 'string' },
          title: { type: 'string' },
          description: { type: 'string' },
          created_at: { type: 'string' },
          updated_at: { type: 'string' },
          sub_tasks: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'string' },
              },
            },
          },
        },
      },
    },
  })
  async getAllTasks(@Query() query: FilterTaskDto) {
    try {
      return this.gallatinProxy.getAllTasks({
        query: {
          title: query.title,
          parent_id: query.parent_id,
        },
        include_sub_tasks: !!query.include_sub_tasks,
        pagination: {
          limit: query.limit,
          offset: query.offset,
        },
      });
    } catch (error) {
      throw new HttpException(
        (error.response ? error.response : error.message) ?? error,
        error.status ?? HttpStatus.EXPECTATION_FAILED,
      );
    }
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
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
  })
  async getTaskById(
    @Param('id') id: string,
    @Query() query: TaskHierarchyTreeRequestDto,
  ) {
    try {
      return this.gallatinProxy.getTaskById(id, !!query.include_sub_tasks);
    } catch (error) {
      throw new HttpException(
        (error.response ? error.response : error.message) ?? error,
        error.status ?? HttpStatus.EXPECTATION_FAILED,
      );
    }
  }

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
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
      },
    },
  })
  async createTask(@Body() body: CreateTaskDto) {
    try {
      return this.gallatinProxy.createTask(body);
    } catch (error) {
      throw new HttpException(
        (error.response ? error.response : error.message) ?? error,
        error.status ?? HttpStatus.EXPECTATION_FAILED,
      );
    }
  }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
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
  })
  async updateTask(@Param('id') id: string, @Body() update: UpdateTaskDto) {
    try {
      return {
        updated_task_count: await this.gallatinProxy.updateTask({ id, update }),
      };
    } catch (error) {
      throw new HttpException(
        (error.response ? error.response : error.message) ?? error,
        error.status ?? HttpStatus.EXPECTATION_FAILED,
      );
    }
  }

  @Patch('/:id/delete')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
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
  })
  async deleteTask(@Param('id') id: string) {
    try {
      return { deleted_task_count: await this.gallatinProxy.deleteTask(id) };
    } catch (error) {
      throw new HttpException(
        (error.response ? error.response : error.message) ?? error,
        error.status ?? HttpStatus.EXPECTATION_FAILED,
      );
    }
  }

  @Delete('/:id/destroy')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
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
  })
  async destroyTask(@Param('id') id: string) {
    try {
      return { destroyed_task_count: await this.gallatinProxy.destroyTask(id) };
    } catch (error) {
      throw new HttpException(
        (error.response ? error.response : error.message) ?? error,
        error.status ?? HttpStatus.EXPECTATION_FAILED,
      );
    }
  }
}
