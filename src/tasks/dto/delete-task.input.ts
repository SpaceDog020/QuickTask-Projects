import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class DeleteTaskInput {  
    @Field(type => Int)
    id: number;
}