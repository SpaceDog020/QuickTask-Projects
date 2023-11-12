import { Field, InputType, Int } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@InputType()
export class CreateProjectInput {
    @IsNotEmpty()
    @Field()
    name: string;
  
    @IsNotEmpty()
    @Field()
    description: string;
  
    @IsNotEmpty()
    @Field((type) => Int)
    idTeam: number;
}