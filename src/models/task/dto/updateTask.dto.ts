import { Injectable } from "@nestjs/common";
import { IsBoolean, IsOptional, IsString } from "class-validator";

Injectable()

export class UpdateTaskDTO{

    @IsString()
    @IsOptional()
    task? : string

    @IsString()
    @IsOptional()
    description? : string

    @IsBoolean()
    @IsOptional()
    isCompleted? : boolean

}