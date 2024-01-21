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
import {
  CreateTaskApiResponse, DeleteTaskApiResponse, DestroyTaskApiResponse,
  GetAllTasksApiResponse,
  GetTaskByIdApiResponse,
  UpdateTaskApiResponse
} from "presentation/api-respons-schema";

@ApiTags('task-manager')
@Controller('/task')
export class TaskController {
  constructor(private readonly gallatinProxy: GallatinProxy) {}
  @Get('/')
  @HttpCode(HttpStatus.OK)
  @GetAllTasksApiResponse()
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
  @GetTaskByIdApiResponse()
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
  @CreateTaskApiResponse()
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
  @UpdateTaskApiResponse()
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
  @DeleteTaskApiResponse()
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
  @DestroyTaskApiResponse()
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
