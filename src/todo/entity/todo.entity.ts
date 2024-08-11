import { Field, ID, Int, ObjectType } from "@nestjs/graphql";

@ObjectType() // indicar que es un objeto de un tipo personalizado para graphql
export class Todo {

    @Field(() => Int) // indicar a graphql el tipo de la propiedad
    id: number;

    @Field(() => String)
    description: string;

    @Field(() => Boolean, { name: "status" })
    done: boolean = false;
}