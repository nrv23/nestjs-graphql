import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Todo } from './entity/todo.entity';
import { TodoService } from './service/todo/todo.service';
import { CreateTodoInput } from './dtos/inputs/create-todo.input';
import { DeleteTodoInput } from './dtos/inputs/delete-todo.input';
import { UpdateTodoInput } from './dtos/inputs/update-todo.input';


@Resolver( () => Todo)
export class TodoResolver {
    // Se puede indicar un tipo de valor personalizado en la respuesta

    constructor(
        private readonly todoService: TodoService
    ) {

    }

    @Query(() => [Todo], { name: "getAllTodos", description: "obtener los todos paginados" })
    findAll() {
        return this.todoService.findAll();
    }
    @Query(() => Todo, { name: "getTodo", description: "obtener un todo por id" })
    findOne(
        @Args('id', { type: () => Int }) // retorna un todo
        id: number = 6): Todo {
        return this.todoService.findById(id);
    }

    @Mutation(() => Todo, {name: "create", description: "crear todo"})
    createTodo(
        @Args('createTodoInput') createTodoInput: CreateTodoInput 
    ) : Todo {
        console.log({createTodoInput})
        return this.todoService.createTodo(createTodoInput);
    }

    updateTodo(id: number, updateTodoInput: UpdateTodoInput) {
        return this.todoService.updateTodo(id, updateTodoInput);
    }

    @Mutation(()=> Boolean,{ name: "deleteTodo"})
    removeTodo(
        @Args('deleteTodoInput',{type: () => Int }) // especifica el tipo de dato para graphql type: () => Int
        deleteTodoInput: DeleteTodoInput
    ) {
        return this.todoService.removeTodo(deleteTodoInput);
    }
}
