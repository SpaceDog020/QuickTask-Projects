import { Field, InputType, Int } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@InputType()
export class RemoveTeamProjectInput {
    @IsNotEmpty()
    @Field((type) => Int)
    idProject: number;
  
    @IsNotEmpty()
    @Field((type) => Int)
    idTeam: number;
}

@InputType()
export class RemoveTeamAllProjectInput {
    @IsNotEmpty()
    @Field((type) => Int)
    idTeam: number;
}