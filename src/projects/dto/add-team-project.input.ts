import { Field, InputType, Int } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@InputType()
export class AddTeamProjectInput {
    @IsNotEmpty()
    @Field((type) => Int)
    idProject: number;
  
    @IsNotEmpty()
    @Field((type) => Int)
    idTeam: number;
}