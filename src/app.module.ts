import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TaskModel } from './models/task/task.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from './models/task/entity/task.entity';


@Module({
  imports: [
    ConfigModule.forRoot({isGlobal : true}),

      TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_NAME'),
        entities: [TaskEntity],
        synchronize: true, // auto creates tables — only for development!
      }),
    }),
    TaskModel
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}