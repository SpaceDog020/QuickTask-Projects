import { Field, InputType, Int } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@InputType()
export class UnlinkAllTaskUserInput {  
    @Field(type => Int)
    idUser: number;
}

@InputType()
export class UnlinkAllTaskUserTeamInput {  
    @Field(type => Int)
    idUser: number;

    @Field(type => Int)
    idTeam: number;
}

