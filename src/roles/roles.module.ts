import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesResolver } from './roles.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/roles.entity';
import { Role_User } from './entities/roles-user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Role]), TypeOrmModule.forFeature([Role_User])],
  providers: [RolesResolver, RolesService],
  exports: [RolesService],
})
export class RolesModule {}
