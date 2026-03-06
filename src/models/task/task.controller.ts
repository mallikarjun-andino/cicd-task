import { Controller, Get, Post, Body, Delete, Param, Patch, Query } from "@nestjs/common";
import { TaskService } from "./task.service";
// import type { Task } from "./interface/task.interface";
import { TaskDTO } from "./dto/task.dto";
import { TaskEntity } from "./entity/task.entity";
import { UpdateTaskDTO } from "./dto/updateTask.dto";

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  heartbeat(): string {
    return this.taskService.heartbeat();
  }

  @Get('all')
  async getAllTasksPagination(@Query('page') page : number , @Query('limit') limit : number): Promise<TaskEntity[]>
 {
    return this.taskService.allTasks(page , limit);
  }

  @Post('create')
  async createTask(@Body() dto: TaskDTO): Promise<TaskEntity[]> {
    return this.taskService.createTask(dto);
  }

  @Delete('delete')
  async deleteTask(@Body() body: { id: string }): Promise<TaskEntity | null> {
    return this.taskService.removeTask(body.id);
  }

  @Patch('edit')
  async updateTask(
    @Body('id') id : string,
    @Body() dto : UpdateTaskDTO
  ){
    return this.taskService.editTask(id , dto);
  }

  @Get('filter')
  async filterTasks(@Query('isCompleted') isCompleted : boolean){
    return this.taskService.filterTasks(isCompleted);
  } 

  @Post('bulk-create')
  async bulkCreateTasks(@Body() dtos: TaskDTO[]): Promise<TaskEntity[]> {
    return this.taskService.bulkCreate(dtos);
  }

}