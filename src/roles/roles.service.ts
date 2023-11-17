import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/roles.entity';
import { In, Repository } from 'typeorm';
import { Role_User } from './entities/roles-user.entity';
import { CreateRoleInput } from './dto/create-role.input';
import { AddRoleUserInput } from './dto/add-role-user.input';
import { DeleteRoleUserByProjectInput, DeleteRoleUserByUserInput, DeleteRoleUserByUsersInput } from './dto/delete-role-user.input';
import { DeleteRoleByIdInput, DeleteRoleByProjectInput } from './dto/delete-role.input';
import { EditRoleInput } from './dto/edit-role.input';
import { ChangeRoleUserInput } from './dto/change-role-user.input';

@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(Role)
        private rolesRepository: Repository<Role>,
        @InjectRepository(Role_User)
        private role_userRepository: Repository<Role_User>,
    ) { }

    async findAll(): Promise<Role[]> {
        return this.rolesRepository.find();
    }

    async findOne(id: number): Promise<Role> {
        return this.rolesRepository.findOne({
            where: {
                id
            }
        });
    }
    
    async findAvailableRolesByProject(idProject: number): Promise<Role[]> {
        return this.rolesRepository
            .createQueryBuilder('role')
            .where('role."idProject" = :idProject', { idProject })
            .andWhere('role."id" NOT IN (SELECT "idRole" FROM role_user WHERE "idProject" = :idProject)', { idProject })
            .getMany();
    }

    async findRolesByProject(idProject: number): Promise<Role[]> {
        return this.rolesRepository
            .createQueryBuilder('role')
            .where('role."idProject" = :idProject', { idProject })
            .getMany();
    }

    async createRole(createRoleInput: CreateRoleInput): Promise<Role> {
        const exists = await this.rolesRepository.findOne({
            where: {
                name: createRoleInput.name
            }
        });
        if (exists) {
            throw new Error('El rol ya existe');
        } else {
            const newRole = this.rolesRepository.create();
            newRole.name = createRoleInput.name;
            newRole.idProject = createRoleInput.idProject;
            return this.rolesRepository.save(newRole);
        }
    }

    async editRole(editRoleInput: EditRoleInput): Promise<Boolean> {
        const role = await this.rolesRepository.findOne({
            where: {
                id: editRoleInput.idRole
            }
        });
        if (!role) {
            throw new Error('El rol no existe');
        } else {
            role.name = editRoleInput.name;
            await this.rolesRepository.save(role);
            return true;
        }
    }

    async deleteRoleById(deleteRoleByIdInput: DeleteRoleByIdInput): Promise<Boolean> {
        const role = await this.rolesRepository.findOne({
            where: {
                id: deleteRoleByIdInput.idRole
            }
        });
        if (!role) {
            throw new Error('El rol no existe');
        } else {
            const roleUser = await this.role_userRepository.find({
                where: {
                    idRole: role.id
                }
            });
            if (roleUser) {
                await this.role_userRepository.remove(roleUser);
            }
            await this.rolesRepository.remove(role);
            return true;
        }
    }

    async deleteRolesByProject(deleteRoleByProject: DeleteRoleByProjectInput): Promise<Boolean> {
        const roles = await this.rolesRepository.find({
            where: {
                idProject: deleteRoleByProject.idProject
            }
        });
        if (!roles) {
            throw new Error('El rol no existe');
        } else {
            const roleUser = await this.role_userRepository.find({
                where: {
                    idProject: deleteRoleByProject.idProject
                }
            });
            if (roleUser) {
                await this.role_userRepository.remove(roleUser);
            }
            await this.rolesRepository.remove(roles);
            return true;
        }
    }

    async findRoleUser(idUser: number, idProject: number): Promise<Role> {
        const roleUser = await this.role_userRepository.findOne({
            where: {
                idUser,
                idProject
            }
        });
        if (!roleUser) {
            throw new Error('El rol no existe');
        } else {
            return this.rolesRepository.findOne({
                where: {
                    id: roleUser.idRole
                }
            });
        }
    }

    async addRoleUser(addRoleUserInput: AddRoleUserInput): Promise<Boolean> {
        const exists = await this.role_userRepository.findOne({
            where: {
                idUser: addRoleUserInput.idUser,
                idProject: addRoleUserInput.idProject
            }
        });
        if (exists) {
            throw new Error('El rol ya existe');
        } else {
            const roleUser = this.role_userRepository.create();
            roleUser.idUser = addRoleUserInput.idUser;
            roleUser.idProject = addRoleUserInput.idProject;
            roleUser.idRole = addRoleUserInput.idRole;
            return this.role_userRepository.save(roleUser).then(() => true);
        }
    }

    async changeRoleUser(changeRoleUserInput: ChangeRoleUserInput): Promise<Boolean> {
        const roleUser = await this.role_userRepository.findOne({
            where: {
                idUser: changeRoleUserInput.idUser,
                idProject: changeRoleUserInput.idProject
            }
        });
        if (!roleUser) {
            throw new Error('El rol no existe');
        } else {
            roleUser.idRole = changeRoleUserInput.idRole;
            await this.role_userRepository.save(roleUser);
            return true;
        }
    }

    async deleteRoleUserByProject(deleteRoleUserByProjectInput: DeleteRoleUserByProjectInput): Promise<Boolean> {
        const idProject = deleteRoleUserByProjectInput.idProject;
        const roleUser = await this.role_userRepository.find({
            where: {
                idProject
            }
        });
        if (!roleUser) {
            throw new Error('El rol no existe');
        } else {
            await this.role_userRepository.remove(roleUser);
            return true;
        }
    }

    async deleteRoleUserByUser(deleteRoleUserByUserInput: DeleteRoleUserByUserInput): Promise<Boolean> {
        const idUser = deleteRoleUserByUserInput.idUser;
        const roleUser = await this.role_userRepository.find({
            where: {
                idUser
            }
        });
        if (!roleUser) {
            return true;
        } else {
            await this.role_userRepository.remove(roleUser);
            return true;
        }
    }

    async deleteRoleUserByUsers(idProject: number, idUsers: number[]): Promise<Boolean> {
        const roleUser = await this.role_userRepository.find({
            where: {
                idProject,
                idUser: In(idUsers)
            }
        });
        if (!roleUser) {
            throw new Error('El rol no existe');
        } else {
            await this.role_userRepository.remove(roleUser);
            return true;
        }
    }
}
