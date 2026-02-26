import { Controller, Get, Post, Body, Delete, Param } from "@nestjs/common";
import { TaskService } from "./task.service";
import type { Task } from "./interface/task.interface";
import { TaskDTO } from "./dto/task.dto";

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {} // lowercase property


  @Get()
  heartbeat(): string {
    return this.taskService.heartbeat();
  }


  @Get('all')
  getAllTasks(): Task[] {
    return this.taskService.alltasks();
  }


  @Post('create')
  createTask(@Body() dto: TaskDTO): Task[] {
    return this.taskService.createTask(dto);
  }

  @Post('delete')
  deleteTask(@Body() body: { id: string }): Task[] {
    return this.taskService.removetask(body.id);
  }

  @Post('edit')
  updateTask(){}

}