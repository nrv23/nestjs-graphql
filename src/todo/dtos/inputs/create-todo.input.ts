import { Field, InputType } from "@nestjs/graphql";
import { IsString, MaxLength, MinLength } from "class-validator";


@InputType() // le indica a graphql que es un input de mutation
export class CreateTodoInput{

    @Field(() => String, {nullable: false, description: "Descripcion de la tarea"})
    @IsString()
    @MinLength(5)
    @MaxLength(10)
    description: string;

}