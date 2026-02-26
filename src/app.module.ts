import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TaskModel } from './models/task/task.model';


@Module({
  imports: [
    ConfigModule.forRoot({isGlobal : true}),
    TaskModel
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}