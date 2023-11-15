import { Field, InputType, Int } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@InputType()
export class EditRoleInput {
    @IsNotEmpty()
    @Field((type) => Int)
    idRole: number;
    
    @IsNotEmpty()
    @Field()
    name: string;
}