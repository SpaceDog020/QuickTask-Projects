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
            updateTask.idTeamUser = updateTaskInput.idTeamUser;
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

    //Caso de que un usuario se elimine
    async unlinkAllTaskUser(idUser: number): Promise<boolean> {
        //Si el usuario tiene tareas asignadas, se desasignan
        await this.tasksRepository.update({
            idUser
        }, {
            idUser: null,
            idTeamUser: null
        });
        
        //Si el usuario es creador de tareas, se desasignan
        await this.tasksRepository.update({
            idCreator: idUser
        }, {
            idCreator: null,
            idTeamCreator: null
        });
        return true;
    }

    //Caso de que un usuario sea expulsado de un equipo
    async unlinkAllTaskUserTeam(idUser: number, idTeam: number): Promise<boolean> {
        //Si el usuario tiene tareas asignadas, se desasignan
        await this.tasksRepository.update({
            idUser,
            idTeamUser: idTeam
        }, {
            idUser: null,
            idTeamUser: null
        });

        //Si el usuario es creador de tareas, se desasignan
        await this.tasksRepository.update({
            idCreator: idUser,
            idTeamCreator: idTeam
        }, {
            idCreator: null,
            idTeamCreator: null
        });
        return true;
    }

    //Caso de que un equipo se elimine
    async unlinkAllTaskTeam(idTeam: number): Promise<boolean> {
        //Si el equipo posee usuarios con tareas asignadas, se desasignan
        await this.tasksRepository.update({
            idTeamUser: idTeam
        }, {
            idUser: null,
            idTeamUser: null
        });

        //Si el equipo posee usuarios que son creador de tareas, se desasignan
        await this.tasksRepository.update({
            idTeamCreator: idTeam
        }, {
            idCreator: null,
            idTeamCreator: null
        });
        return true;
    }

    //Caso de que un equipo sea expulsado de un proyecto
    async unlinkAllTaskTeamProject(idTeam: number, idProject: number): Promise<boolean> {
        //Si el equipo posee usuarios con tareas asignadas, se desasignan
        await this.tasksRepository.update({
            idTeamUser: idTeam,
            idProject
        }, {
            idUser: null,
            idTeamUser: null
        });

        //Si el equipo posee usuarios que son creador de tareas, se desasignan
        await this.tasksRepository.update({
            idTeamCreator: idTeam,
            idProject
        }, {
            idCreator: null,
            idTeamCreator: null
        });
        return true;
    }

















}
