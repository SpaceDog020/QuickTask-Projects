import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { CreateTaskInput } from './dto/create-task.input';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private tasksRepository: Repository<Task>,
    ) { }

    async findAll(): Promise<Task[]> { //Promise is what it's expected to receive
        return await this.tasksRepository.find();
    }

    async findOne(id: number): Promise<Task> {
        return await this.tasksRepository.findOne({
            where: {
                id
            }
        });
    }

    async createTask(createTaskInput: CreateTaskInput): Promise<Task> {
        const exists= await this.tasksRepository.findOne({
            where: {
                idProject: createTaskInput.idProject, 
                name: createTaskInput.name
            }
        });
        if(exists){
            throw new Error('Ya existe una tarea con ese nombre en el proyecto');
        }
        const newTask = await this.tasksRepository.create(createTaskInput);
        return await this.tasksRepository.save(newTask);
    }

    async deleteTaskByProjectId(idProject: number): Promise<boolean> {
        const result = await this.tasksRepository.delete({
            idProject
        });
        return true;
    }

    async deleteTask(id: number): Promise<boolean> {
        const result = await this.tasksRepository.delete({
            id
        });
        return true;
    }
















}
