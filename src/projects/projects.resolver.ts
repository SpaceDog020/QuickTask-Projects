import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProjectsService } from './projects.service';
import { Project } from './entities/projects.entity';
import { CreateProjectInput } from './dto/create-project.input';

@Resolver(() => Project)
export class ProjectsResolver {
  constructor(
    private readonly projectsService: ProjectsService
  ) {}

  @Query((returns) => [Project])
  projects() {
    console.log('[*] projects');
    return this.projectsService.findAll();
  }

  @Query((returns) => Project)
  project(@Args('id') id: number) {
    console.log('[*] project');
    return this.projectsService.findOne(id);
  }

  @Query((returns) => [Project])
  projectsByTeam(@Args('idTeam') idTeam: number) {
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
    try{
      return await this.projectsService.createProject(createProjectInput);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
