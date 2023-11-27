import { Module, forwardRef } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksResolver } from './tasks.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { ProjectsModule } from 'src/projects/projects.module';


@Module({
  imports: [TypeOrmModule.forFeature([Task]), forwardRef(() => ProjectsModule),], // for TypeORM to make a connection to the database
  providers: [TasksResolver, TasksService],
  exports: [TasksService]  //resolver is coms with graphql and service is for business logic 
})
export class TasksModule {}
