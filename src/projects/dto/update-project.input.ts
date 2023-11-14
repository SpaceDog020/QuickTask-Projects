import { Field, InputType, Int } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@InputType()
export class UpdateProjectInput {
    @IsNotEmpty()
    @Field((type) => Int)
    id: number;

    @IsNotEmpty()
    @Field()
    name: string;
  
    @IsNotEmpty()
    @Field()
    description: string;
}