import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
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
