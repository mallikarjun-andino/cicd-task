import { Injectable } from "@nestjs/common";
import {Task} from "./interface/task.interface"
import { TaskDTO } from "./dto/task.dto";
import { TaskEntity } from "./entity/task.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UpdateTaskDTO } from "./dto/updateTask.dto";

@Injectable()
export class TaskService{

    constructor(
        @InjectRepository(TaskEntity)
        private readonly taskRepo : Repository<TaskEntity>
    ){}


    heartbeat():string{
        return "Task API is responding !";
    }

    async createTask(dto: TaskDTO): Promise<TaskEntity[]> {
        const newTask: TaskEntity = this.taskRepo.create({
            task: dto.task,
            description : dto.description, 
            isCompleted : dto.isCompleted 
        });
        await this.taskRepo.save(newTask);
        return this.taskRepo.find();
    }   

    async allTasks(page?: number, limit?: number):Promise<TaskEntity[]>{
        
        if(!page || !limit){
            return this.taskRepo.find();
        }
        
        return this.taskRepo.find({
            skip: (page - 1) * limit,
            take: limit
        });
    }

    async removeTask(taskId: string): Promise<TaskEntity | null> {
        const DeletedTask = await this.taskRepo.findOneBy({id : taskId});
        await this.taskRepo.delete(taskId);
        return DeletedTask;
    }

    async editTask(taskId : string,updatedTask : UpdateTaskDTO) : Promise<TaskEntity | null>{
        await this.taskRepo.update(taskId, updatedTask);
        return this.taskRepo.findOneBy({id : taskId});
    }

    async filterTasks(isCompleted : boolean) : Promise<TaskEntity[]>{
        return this.taskRepo.findBy({ isCompleted : isCompleted });
    }

    async bulkCreate(dtos: TaskDTO[]): Promise<TaskEntity[]> {
        return this.taskRepo.manager.transaction(async (manager) => {
        const tasks = manager.create(TaskEntity, dtos);
        return manager.save(tasks);
  });
}


}