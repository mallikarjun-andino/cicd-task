import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('task')
export class TaskEntity{

    @PrimaryGeneratedColumn('uuid')
    id : string

    @Column()
    task : string

    @Column()
    description : string

    @Column({default : false})
    isCompleted : boolean

}