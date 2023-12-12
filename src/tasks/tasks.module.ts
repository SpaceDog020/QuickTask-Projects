import { Module, forwardRef } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksResolver } from './tasks.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { ProjectsModule } from 'src/projects/projects.module';


@Module({
  imports: [TypeOrmModule.forFeature([Task]), forwardRef(() => ProjectsModule),],
  providers: [TasksResolver, TasksService],
  exports: [TasksService]
})
export class TasksModule {}
