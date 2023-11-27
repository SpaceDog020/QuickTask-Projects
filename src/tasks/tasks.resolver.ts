import { Args, Resolver } from '@nestjs/graphql';
import { TasksService } from './tasks.service';
import { Query, Mutation} from '@nestjs/graphql';
import { Task } from './entities/task.entity';
import { CreateTaskInput } from './dto/create-task.input';

@Resolver()
export class TasksResolver {
  constructor(private readonly tasksService: TasksService) {}

  @Query((returns ) => [Task])
  tasks() {
    return this.tasksService.findAll();
  }

  @Query((returns ) => Task)
  task(@Args('id') id: number) {
    return this.tasksService.findOne(id);
  }

  @Mutation((returns ) => Task)
  async createTask(@Args('createTaskInput') createTaskInput: CreateTaskInput) {
    try{
      return await this.tasksService.createTask(createTaskInput);
    }
    catch (error){
      const errorMessage = error.response?.errors[0]?.message || 'Error desconocido';
      if (errorMessage === 'Error desconocido') {
        throw new Error(error.message);
      }
      throw new Error(errorMessage);
    }
  } 

  




}


