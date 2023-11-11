import { Injectable } from '@nestjs/common';
import { Project } from './entities/projects.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectInput } from './dto/create-project.input';

@Injectable()
export class ProjectsService {
    constructor(
        @InjectRepository(Project)
        private projectsRepository: Repository<Project>,
    ) { }

    async findAll(): Promise<Project[]> {
        return this.projectsRepository.find();
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
            const newProject = this.projectsRepository.create(createProjectInput);
            return this.projectsRepository.save(newProject);
        }
    }
}
