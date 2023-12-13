import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class UnlinkAllTaskUserInput {  
    @Field(type => Int)
    idUser: number;
}