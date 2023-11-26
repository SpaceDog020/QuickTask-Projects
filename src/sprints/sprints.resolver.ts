import { Resolver } from '@nestjs/graphql';
import { SprintsService } from './sprints.service';

@Resolver()
export class SprintsResolver {
  constructor(private readonly sprintsService: SprintsService) {}
}
