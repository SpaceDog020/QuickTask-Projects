import { Args, Resolver } from '@nestjs/graphql';
import { TasksService } from './tasks.service';
import { Query, Mutation} from '@nestjs/graphql';
import { ResponseTasks, Task } from './entities/task.entity';
import { CreateTaskInput } from './dto/create-task.input';
import { UnlinkAllTaskUserInput, UnlinkAllTaskUserTeamInput } from './dto/unlink-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { DeleteTaskInput } from './dto/delete-task.input';

@Resolver()
export class TasksResolver {
  constructor(private readonly tasksService: TasksService) {}

  @Query((returns ) => [Task])
  tasks() {
    console.log('[*] tasks');
    return this.tasksService.findAll();
  }

  @Query((returns ) => Task)
  task(@Args('id') id: number) {
    console.log('[*] task');
    return this.tasksService.findOne(id);
  }

  @Mutation((returns ) => Task)
  async createTask(@Args('createTaskInput') createTaskInput: CreateTaskInput) {
    console.log('[*] createTask');
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

  @Mutation((returns ) => ResponseTasks)
  async unlinkAllTaskUser(@Args('unlinkAllTaskUserInput') unlinkAllTaskUserInput: UnlinkAllTaskUserInput) {
    console.log('[*] unlinkAllTaskUser');
    try{
      const validate = await this.tasksService.unlinkAllTaskUser(unlinkAllTaskUserInput.idUser);
      if (validate) {
        return { response: true };
      } else {
        return { response: false };
      }
    }
    catch (error){
      const errorMessage = error.response?.errors[0]?.message || 'Error desconocido';
      if (errorMessage === 'Error desconocido') {
        throw new Error(error.message);
      }
      throw new Error(errorMessage);
    }
  }

  @Mutation((returns ) => ResponseTasks)
  async unlinkAllTaskUserTeam(@Args('unlinkAllTaskUserTeamInput') unlinkAllTaskUserTeamInput: UnlinkAllTaskUserTeamInput) {
    console.log('[*] unlinkAllTaskUserTeam');
    try{
      const validate = await this.tasksService.unlinkAllTaskUserTeam(unlinkAllTaskUserTeamInput.idUser, unlinkAllTaskUserTeamInput.idTeam);
      if (validate) {
        return { response: true };
      } else {
        return { response: false };
      }
    }
    catch (error){
      const errorMessage = error.response?.errors[0]?.message || 'Error desconocido';
      if (errorMessage === 'Error desconocido') {
        throw new Error(error.message);
      }
      throw new Error(errorMessage);
    }
  }

  @Mutation((returns ) => ResponseTasks)
  async updateTask(@Args('updateTaskInput') updateTaskInput: UpdateTaskInput) {
    console.log('[*] updateTask');
    try{
      const validate = await this.tasksService.updateTask(updateTaskInput);
      if (validate) {
        return { response: true };
      } else {
        return { response: false };
      }
    }
    catch (error){
      const errorMessage = error.response?.errors[0]?.message || 'Error desconocido';
      if (errorMessage === 'Error desconocido') {
        throw new Error(error.message);
      }
      throw new Error(errorMessage);
    }
  }

  @Mutation((returns ) => ResponseTasks)
  async deleteTask(@Args('deleteTaskInput') deleteTaskInput: DeleteTaskInput) {
    console.log('[*] deleteTask');
    try{
      const validate = await this.tasksService.deleteTask(deleteTaskInput.id);
      if (validate) {
        return { response: true };
      } else {
        return { response: false };
      }
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


