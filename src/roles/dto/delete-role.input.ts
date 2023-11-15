import { Field, InputType, Int } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@InputType()
export class DeleteRoleByIdInput {
    @IsNotEmpty()
    @Field((type) => Int)
    idRole: number;
}

@InputType()
export class DeleteRoleByProjectInput {
    @IsNotEmpty()
    @Field((type) => Int)
    idProject: number;
}