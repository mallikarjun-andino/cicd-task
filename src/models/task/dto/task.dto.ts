import { Injectable } from "@nestjs/common";
import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

@Injectable()

export class TaskDTO{
    @IsString()
    task : string

    @IsString()
    @IsNotEmpty()
    description : string

    @IsBoolean()
    isCompleted : boolean

}