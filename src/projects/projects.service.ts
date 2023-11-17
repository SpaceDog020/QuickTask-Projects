import { Injectable } from '@nestjs/common';
import { Project } from './entities/projects.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateProjectInput } from './dto/create-project.input';
import { UpdateProjectInput } from './dto/update-project.input';
import { DeleteProjectInput } from './dto/delete-project.input';
import { AddTeamProjectInput } from './dto/add-team-project.input';
import { RolesService } from 'src/roles/roles.service';
import { RemoveTeamProjectInput } from './dto/remove-team-project.input';

@Injectable()
export class ProjectsService {
    constructor(
        @InjectRepository(Project)
        private projectsRepository: Repository<Project>,
        private rolesService: RolesService,
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

    async deleteProject(deleteProjectInput: DeleteProjectInput): Promise<Boolean> {
        const project = await this.projectsRepository.findOne({
            where: {
                id: deleteProjectInput.id
            }
        });
        if (!project) {
            throw new Error('El proyecto no existe');
        } else {
            const roles = await this.rolesService.findRolesByProject(project.id);
            if (roles.length > 0) {
                await this.rolesService.deleteRolesByProject({ idProject: project.id });
            }
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

    async addTeamProject(addTeamToProject: AddTeamProjectInput): Promise<Boolean> {
        const project = await this.projectsRepository.findOne({
            where: {
                id: addTeamToProject.idProject
            }
        });
        if (!project) {
            throw new Error('El proyecto no existe');
        } else {
            const exists = project.idTeams.find(idTeam => idTeam === addTeamToProject.idTeam);
            if (exists) {
                throw new Error('El equipo ya existe en el proyecto');
            }
            project.idTeams.push(addTeamToProject.idTeam);
            await this.projectsRepository.save(project);
            return true;
        }
    }

    async removeTeamProject(removeTeamToProject: RemoveTeamProjectInput): Promise<Boolean> {
        const project = await this.projectsRepository.findOne({
            where: {
                id: removeTeamToProject.idProject
            }
        });
        if (!project) {
            throw new Error('El proyecto no existe');
        } else {
            const exists = project.idTeams.find(idTeam => idTeam === removeTeamToProject.idTeam);
            if (!exists) {
                throw new Error('El equipo no existe en el proyecto');
            }
            const deleteRolesUser = await this.rolesService.deleteRoleUserByUsers(removeTeamToProject.idProject, removeTeamToProject.idUsers);
            if (!deleteRolesUser) {
                throw new Error('Error al eliminar los roles de los usuarios');
            }
            project.idTeams = project.idTeams.filter(idTeam => idTeam !== removeTeamToProject.idTeam);
            await this.projectsRepository.save(project);
            return true;
        }
    }

    async removeTeamAllProjects(idTeam: number, idUsers: number[]): Promise<Boolean> {
        console.log('idTeam', idTeam, 'idUsers', idUsers);
        const projects = await this.projectsRepository.createQueryBuilder('project')
            .where(':idTeam = ANY(project.idTeams)', { idTeam }) // Esta línea es la clave
            .getMany();

        if (projects.length === 0) {
            return true;
        }

        for (const project of projects) {
            await this.rolesService.deleteRoleUserByUsers(project.id, idUsers);

            project.idTeams = project.idTeams.filter(id => id !== idTeam);
        }

        await this.projectsRepository.save(projects);
        return true;
    }

}
