import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { RolesService } from './roles.service';
import { ResponseRole, Role } from './entities/roles.entity';
import { CreateRoleInput } from './dto/create-role.input';
import { DeleteRoleByIdInput, DeleteRoleByProjectInput } from './dto/delete-role.input';
import { EditRoleInput } from './dto/edit-role.input';
import { AddRoleUserInput } from './dto/add-role-user.input';
import { DeleteRoleUserByProjectInput, DeleteRoleUserByUserInput, DeleteRoleUserByUsersInput } from './dto/delete-role-user.input';

@Resolver()
export class RolesResolver {
  constructor(
    private readonly rolesService: RolesService
  ) { }

  @Query((returns) => [Role])
  roles() {
    console.log('[*] roles');
    return this.rolesService.findAll();
  }

  @Query((returns) => Role)
  role(@Args('id') id: number) {
    console.log('[*] role');
    return this.rolesService.findOne(id);
  }

  @Query((returns) => [Role])
  availableRolesByProject(@Args('idProject') idProject: number) {
    console.log('[*] availableRolesByProject');
    return this.rolesService.findAvailableRolesByProject(idProject);
  }

  @Query((returns) => [Role])
  findRolesByProject(@Args('idProject') idProject: number) {
    console.log('[*] findRolesByProject');
    return this.rolesService.findRolesByProject(idProject);
  }

  @Mutation((returns) => Role)
  async createRole(@Args('createRoleInput') createRoleInput: CreateRoleInput) {
    console.log('[*] createRole');
    try {
      return this.rolesService.createRole(createRoleInput);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Mutation((returns) => ResponseRole)
  async deleteRoleById(@Args('deleteRoleByIdInput') deleteRoleByIdInput: DeleteRoleByIdInput) {
    console.log('[*] deleteRole');
    try {
      const validate = await this.rolesService.deleteRoleById(deleteRoleByIdInput);
      if (validate) {
        return { response: true };
      } else {
        return { response: false };
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Mutation((returns) => ResponseRole)
  async deleteRolesByProject(@Args('deleteRoleByProjectInput') deleteRoleByProjectInput: DeleteRoleByProjectInput) {
    console.log('[*] deleteRoleByProject');
    try {
      const validate = await this.rolesService.deleteRolesByProject(deleteRoleByProjectInput);
      if (validate) {
        return { response: true };
      } else {
        return { response: false };
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Mutation((returns) => ResponseRole)
  async editRole(@Args('editRoleInput') editRoleInput: EditRoleInput) {
    console.log('[*] editRole');
    try {
      const validate = await this.rolesService.editRole(editRoleInput);
      if (validate) {
        return { response: true };
      } else {
        return { response: false };
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Mutation((returns) => ResponseRole)
  async addRoleToUser(@Args('addRoleUserInput') addRoleUserInput: AddRoleUserInput) {
    console.log('[*] addRoleToUser');
    try {
      const validate = await this.rolesService.addRoleUser(addRoleUserInput);
      if (validate) {
        return { response: true };
      } else {
        return { response: false };
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Mutation((returns) => ResponseRole)
  async deleteRoleUserByProject(@Args('deleteRoleUserByProjectInput') deleteRoleUserByProjectInput: DeleteRoleUserByProjectInput) {
    console.log('[*] deleteRoleUserByProject');
    try {
      const validate = await this.rolesService.deleteRoleUserByProject(deleteRoleUserByProjectInput);
      if (validate) {
        return { response: true };
      } else {
        return { response: false };
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Mutation((returns) => ResponseRole)
  async deleteRoleUserByUser(@Args('deleteRoleUserByUserInput') deleteRoleUserByUserInput: DeleteRoleUserByUserInput) {
    console.log('[*] deleteRoleUserByUser');
    try {
      const validate = await this.rolesService.deleteRoleUserByUser(deleteRoleUserByUserInput);
      if (validate) {
        return { response: true };
      } else {
        return { response: false };
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Mutation((returns) => ResponseRole)
  async deleteRoleUserByUsers(@Args('deleteRoleUserByUsersInput') deleteRoleUserByUsersInput: DeleteRoleUserByUsersInput) {
    console.log('[*] deleteRoleUserByUsers');
    try {
      const validate = await this.rolesService.deleteRoleUserByUsers(deleteRoleUserByUsersInput.idProject, deleteRoleUserByUsersInput.idUsers);
      if (validate) {
        return { response: true };
      } else {
        return { response: false };
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

}
