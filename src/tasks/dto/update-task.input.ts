import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class UpdateTaskInput {
    @Field(type => Int)
    id: number;

    @Field(type => Int)
    idProject: number;

    @Field(type => Int, {nullable: true})
    idUser: number;

    @Field(type => Int, {nullable: true})
    idTeamUser: number;

    @Field()
    name: string;

    @Field()
    description: string;

    @Field({nullable: true})
    startDate: string;

    @Field({nullable: true})
    finishDate: string;

}