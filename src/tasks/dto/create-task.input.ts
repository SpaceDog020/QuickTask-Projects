import { Field, InputType, Int } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@InputType()
export class CreateTaskInput {
    @Field(type => Int)
    idCreator: number;

    @Field(type => Int)
    idProject: number;
    
    @Field(type => Int, {nullable: true})
    idUser: number;

    @Field()
    name: string;

    @Field()
    description: string;

    @Field()
    status: string;

    @Field({nullable: true})
    startDate: string;

    @Field({nullable: true})
    finishDate: string;

    @Field()
    isDone: boolean;

}

