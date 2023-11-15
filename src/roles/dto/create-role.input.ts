import { Field, InputType, Int } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@InputType()
export class CreateRoleInput {
    @IsNotEmpty()
    @Field()
    name: string;
  
    @IsNotEmpty()
    @Field((type) => Int)
    idProject: number;
}