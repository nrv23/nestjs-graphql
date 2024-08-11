import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString, MaxLength, Min, MinLength } from "class-validator";

@InputType() // le indica a graphql que es un input de mutation
export class UpdateTodoInput {

    @Field(() => String, {nullable: false, description: "Descripcion de la tarea"})
    @IsString()
    @MinLength(5)
    @MaxLength(10)
    description: string;

    @Field(() => Boolean, { name: "status" })
    done: boolean;
}