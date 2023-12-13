import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private tasksRepository: Repository<Task>,
    ) { }

    async findAll(): Promise<Task[]> {
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
        const newTask = this.tasksRepository.create(createTaskInput);
        if(createTaskInput.startDate){
            newTask.status = 'In Progress';
        }else{
            newTask.status = 'To Do';
        }
        return await this.tasksRepository.save(newTask);
    }

    async deleteTaskByProjectId(idProject: number): Promise<boolean> {
        await this.tasksRepository.delete({
            idProject
        });
        return true;
    }

    async updateTask(updateTaskInput: UpdateTaskInput): Promise<boolean> {
        const exists= await this.tasksRepository.findOne({
            where: {
                idProject: updateTaskInput.idProject, 
                name: updateTaskInput.name
            }
        });
        if(exists && exists.id !== updateTaskInput.id){
            throw new Error('Ya existe una tarea con ese nombre en el proyecto');
        }
        const updateTask = await this.tasksRepository.findOne({
            where: {
                id: updateTaskInput.id
            }
        });
        if(updateTaskInput.idUser){
            updateTask.idUser = updateTaskInput.idUser;
        }
        if(updateTaskInput.name){
            updateTask.name = updateTaskInput.name;
        }
        if(updateTaskInput.description){
            updateTask.description = updateTaskInput.description;
        }
        if(updateTaskInput.startDate){
            updateTask.startDate = updateTaskInput.startDate;
            updateTask.status = 'In Progress';
        }
        if(updateTaskInput.finishDate){
            updateTask.finishDate = updateTaskInput.finishDate;
            updateTask.status = 'Done';
        }
        await this.tasksRepository.save(updateTask);
        return true;
    }

    async deleteTask(id: number): Promise<boolean> {
        const exist = await this.tasksRepository.findOne({
            where: {
                id
            }
        });
        if(!exist){
            throw new Error('No existe una tarea con ese id');
        }else{
            exist.status = 'Deleted';
            await this.tasksRepository.save(exist);
            return true;
        }
    }
    
    async findByProjectId(projectId: number): Promise<Task[]> {
        return await this.tasksRepository.find({
            where: {
                idProject: projectId,
            },
        });
    }

    //Caso de que un usuario se elimine
    async unlinkAllTaskUser(idUser: number): Promise<boolean> {
        const tasksUser = await this.tasksRepository.find({
            where: {
                idUser
            }
        });
        tasksUser.forEach(async task => {
            task.idUser = null;
            await this.tasksRepository.save(task);
        });

        const taskCreator = await this.tasksRepository.find({
            where: {
                idCreator: idUser
            }
        });
        taskCreator.forEach(async task => {
            task.idCreator = null;
            await this.tasksRepository.save(task);
        });
        return true;
    }

    //Caso de que un usuario sea expulsado de un equipo

    //Caso de que un equipo se elimine

    //Caso de que un equipo sea expulsado de un proyecto
}
