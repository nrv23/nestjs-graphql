import { Args, Float, Int, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class HelloWorldResolver {

    @Query(() => String, { description: "Mensaje de hola mundo", name: "hello" }) // se debe indicar el valor de retorno de el query 
    helloWorld(): string {
        return 'Hola mundo';
    }

    @Query(() => Float, { description: "Regresa un numero random", name: "randmon" })
    getRandomNumber(): number {

        return Math.random() * 100;
    }

    @Query(() => Int, { description: "regresar un numero entero entre cero y otro numero", name: "randomFromZeroTo" })
    getRandomFromZeroTo(
        @Args('number',{ // indicar que es un argumento de graphq l
            type : () => Int, nullable: true } // indicar el tipo de valor de entrada para evitar errores con los tipos de valor de typescript
            // nullable: true indica que el valor es opcional
        ) to: number = 6): number { // se setea por default a 6 el valor

        return Math.floor(Math.random() * to);
    }

}
