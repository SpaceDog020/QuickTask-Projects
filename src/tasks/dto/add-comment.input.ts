import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class AddCommentInput {
    @Field(type => Int)
    idTask: number;

    @Field()
    comment: string;
}