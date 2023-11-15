import { Field, InputType, Int } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@InputType()
export class AddRoleUserInput {
    @IsNotEmpty()
    @Field((type) => Int)
    idRole: number;
  
    @IsNotEmpty()
    @Field((type) => Int)
    idUser: number;

    @IsNotEmpty()
    @Field((type) => Int)
    idProject: number;
}