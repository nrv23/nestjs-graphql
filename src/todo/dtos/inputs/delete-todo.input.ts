import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, Min } from "class-validator";

@InputType() // le indica a graphql que es un input de mutation
export class DeleteTodoInput {

    @IsNumber()
    @IsNotEmpty()
    @Min(1)
    @Field(()=> Int, { name:"id", description: "id de todo" })
    id: number;
}