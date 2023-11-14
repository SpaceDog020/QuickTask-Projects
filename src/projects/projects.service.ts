import { Injectable } from '@nestjs/common';
import { Project } from './entities/projects.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectInput } from './dto/create-project.input';
import { UpdateProjectInput } from './dto/update-project.input';

@Injectable()
export class ProjectsService {
    constructor(
        @InjectRepository(Project)
        private projectsRepository: Repository<Project>,
    ) { }

    async findAll(): Promise<Project[]> {
        return this.projectsRepository.find();
    }

    async findOne(id: number): Promise<Project> {
        return this.projectsRepository.findOne({
            where: {
                id
            }
        });
    }

    async findProjectsByTeam(idTeam: number): Promise<Project[]> {
        return this.projectsRepository
            .createQueryBuilder('project')
            .where(':idTeam = ANY (project."idTeams")', { idTeam })
            .getMany();
    }

    async findProjectsByTeams(teamIds: number[]): Promise<Project[]> {
        return this.projectsRepository
          .createQueryBuilder('project')
          .where('project."idTeams" && :teamIds', { teamIds })
          .getMany();
    }
    
    async createProject(createProjectInput: CreateProjectInput): Promise<Project> {
        const exists = await this.projectsRepository.findOne({
            where: {
                name: createProjectInput.name
            }
        });
        if (exists) {
            throw new Error('El proyecto ya existe');
        } else {
            const newProject = this.projectsRepository.create();
            newProject.name = createProjectInput.name;
            newProject.description = createProjectInput.description;
            newProject.idTeams = [createProjectInput.idTeam];
            return this.projectsRepository.save(newProject);
        }
    }

    async deleteProject(id: number): Promise<Boolean> {
        const project = await this.projectsRepository.findOne({
            where: {
                id
            }
        });
        if (!project) {
            throw new Error('El proyecto no existe');
        } else {
            await this.projectsRepository.remove(project);
            return true;
        }
    }

    async updateProject(updateProjectInput: UpdateProjectInput): Promise<Boolean> {
        const project = await this.projectsRepository.findOne({
            where: {
                id: updateProjectInput.id
            }
        });
        if (!project) {
            throw new Error('El proyecto no existe');
        } else {
            project.name = updateProjectInput.name;
            project.description = updateProjectInput.description;
            await this.projectsRepository.save(project);
            return true;
        }
    }
}
