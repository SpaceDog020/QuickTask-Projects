import { Field, InputType, Int } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@InputType()
export class DeleteProjectInput {
    @IsNotEmpty()
    @Field((type) => Int)
    id: number;
}