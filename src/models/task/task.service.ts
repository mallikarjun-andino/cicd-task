import { Injectable } from "@nestjs/common";
import {Task} from "./interface/task.interface"
import { TaskDTO } from "./dto/task.dto";

@Injectable()
export class TaskService{

    private readonly tasks : Task[] = [
        {id : "haha" , task : "buy milk"}
    ];

    heartbeat():string{
        return "Task API is responding !";
    }

    createTask(dto: TaskDTO): Task[] {
        const newTask: Task = {
            id: Date.now().toString(),
            task: dto.task,
        }
        this.tasks.push(newTask);
        return this.tasks;
    }   

    alltasks():Task[]{
        return this.tasks;
    }

    removetask(taskId: string): Task[] {
        const index = this.tasks.findIndex(t => t.id === taskId);
        this.tasks.splice(index, 1);
        return this.tasks;
    }

    edittask(taskId : string,updatedTask : string) : Task[]{
        const task = this.tasks.find(t => t.id == taskId)

        if(!task) return this.tasks

        task.task = updatedTask;

        return this.tasks 


    }



}