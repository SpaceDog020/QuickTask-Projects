import { Field, InputType, Int } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@InputType()
export class DeleteRoleUserByProjectInput {
    @IsNotEmpty()
    @Field((type) => Int)
    idProject: number;
}

@InputType()
export class DeleteRoleUserByUserInput {
    @IsNotEmpty()
    @Field((type) => Int)
    idUser: number;
}

@InputType()
export class DeleteRoleUserByUsersInput {
    @IsNotEmpty()
    @Field((type) => Int)
    idProject: number;

    @IsNotEmpty()
    @Field((type) => [Int])
    idUsers: number[];
}