import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProjectsService } from './projects.service';
import { Project, ResponseProjects } from './entities/projects.entity';
import { CreateProjectInput } from './dto/create-project.input';
import { UpdateProjectInput } from './dto/update-project.input';
import { DeleteProjectInput } from './dto/delete-project.input';
import { AddTeamProjectInput } from './dto/add-team-project.input';
import { RemoveTeamAllProjectInput, RemoveTeamProjectInput } from './dto/remove-team-project.input';

@Resolver(() => Project)
export class ProjectsResolver {
  constructor(
    private readonly projectsService: ProjectsService,
  ) { }

  @Query((returns) => [Project])
  projects() {
    console.log('[*] projects');
    return this.projectsService.findAll();
  }

  @Query((returns) => Project)
  project(@Args('id', { type: () => Int }) id: number) {
    console.log('[*] project');
    return this.projectsService.findOne(id);
  }

  @Query((returns) => [Project])
  projectsByTeam(@Args('idTeam', { type: () => Int }) idTeam: number) {
    console.log('[*] projectsByTeam');
    return this.projectsService.findProjectsByTeam(idTeam);
  }

  @Query((returns) => [Project])
  projectsByTeams(@Args('teamIds', { type: () => [Int] }) teamIds: number[]) {
    console.log('[*] projectsByTeams');
    return this.projectsService.findProjectsByTeams(teamIds);
  }

  @Mutation((returns) => Project)
  async createProject(
    @Args('createProjectInput') createProjectInput: CreateProjectInput) {
    console.log('[*] createProject');
    try {
      return await this.projectsService.createProject(createProjectInput);
    } catch (error) {
      const errorMessage = error.response?.errors[0]?.message || 'Error desconocido';
      if (errorMessage === 'Error desconocido') {
        throw new Error(error.message);
      }
      throw new Error(errorMessage);
    }
  }

  @Mutation((returns) => ResponseProjects)
  async deleteProject(@Args('deleteProjectInput') deleteProjectInput: DeleteProjectInput) {
    console.log('[*] deleteProject');
    try {
      const validate = await this.projectsService.deleteProject(deleteProjectInput);
      if (validate) {
        return { response: true };
      } else {
        return { response: false };
      }
    } catch (error) {
      const errorMessage = error.response?.errors[0]?.message || 'Error desconocido';
      if (errorMessage === 'Error desconocido') {
        throw new Error(error.message);
      }
      throw new Error(errorMessage);
    }
  }

  @Mutation((returns) => ResponseProjects)
  async updateProject(@Args('updateProjectInput') updateProjectInput: UpdateProjectInput) {
    console.log('[*] updateProject');
    try {
      const validate = await this.projectsService.updateProject(updateProjectInput);
      if (validate) {
        return { response: true };
      } else {
        return { response: false };
      }
    } catch (error) {
      const errorMessage = error.response?.errors[0]?.message || 'Error desconocido';
      if (errorMessage === 'Error desconocido') {
        throw new Error(error.message);
      }
      throw new Error(errorMessage);
    }
  }

  @Mutation((returns) => ResponseProjects)
  async addTeamProject(@Args('addTeamProjectInput') addTeamProjectInput: AddTeamProjectInput) {
    console.log('[*] addTeamProject');
    try {
      const validate = await this.projectsService.addTeamProject(addTeamProjectInput);
      if (validate) {
        return { response: true };
      } else {
        return { response: false };
      }
    } catch (error) {
      const errorMessage = error.response?.errors[0]?.message || 'Error desconocido';
      if (errorMessage === 'Error desconocido') {
        throw new Error(error.message);
      }
      throw new Error(errorMessage);
    }
  }

  @Mutation((returns) => ResponseProjects)
  async removeTeamProject(@Args('removeTeamProjectInput') removeTeamProjectInput: RemoveTeamProjectInput) {
    console.log('[*] removeTeamProject');
    try {
      const validate = await this.projectsService.removeTeamProject(removeTeamProjectInput);
      if (validate) {
        return { response: true };
      } else {
        return { response: false };
      }
    } catch (error) {
      const errorMessage = error.response?.errors[0]?.message || 'Error desconocido';
      if (errorMessage === 'Error desconocido') {
        throw new Error(error.message);
      }
      throw new Error(errorMessage);
    }
  }

  @Mutation((returns) => ResponseProjects)
  async removeTeamAllProject(@Args('removeTeamAllProjectInput') removeTeamAllProjectInput: RemoveTeamAllProjectInput) {
    console.log('[*] removeTeamAllProject');
    try {
      const idTeam = removeTeamAllProjectInput.idTeam;

      const validate = await this.projectsService.removeTeamAllProjects(idTeam);
      if (validate) {
        return { response: true };
      } else {
        return { response: false };
      }
    } catch (error) {
      const errorMessage = error.response?.errors[0]?.message || 'Error desconocido';
      if (errorMessage === 'Error desconocido') {
        throw new Error(error.message);
      }
      throw new Error(errorMessage);
    }
  }
}
