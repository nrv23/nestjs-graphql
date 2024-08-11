import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Todo } from './entity/todo.entity';
import { TodoService } from './service/todo/todo.service';
import { CreateTodoInput } from './dtos/inputs/create-todo.input';
import { DeleteTodoInput } from './dtos/inputs/delete-todo.input';
import { UpdateTodoInput } from './dtos/inputs/update-todo.input';
import { StatusArgs } from './dtos/args/status.args';
import { AggregationsType } from './types/aggregation.type';


@Resolver(() => Todo)
export class TodoResolver {
    // Se puede indicar un tipo de valor personalizado en la respuesta

    constructor(
        private readonly todoService: TodoService
    ) {

    }

    @Query(() => [Todo], { name: "getAllTodos", description: "obtener los todos paginados" })
    findAll(
        @Args() args: StatusArgs
    ) {
        return this.todoService.findAll(args);
    }
    @Query(() => Todo, { name: "getTodo", description: "obtener un todo por id" })
    findOne(
        @Args('id', { type: () => Int }) // retorna un todo
        id: number = 6): Todo {
        return this.todoService.findById(id);
    }

    @Mutation(() => Todo, { name: "create", description: "crear todo" })
    createTodo(
        @Args('createTodoInput') createTodoInput: CreateTodoInput
    ): Todo {
        console.log({ createTodoInput })
        return this.todoService.createTodo(createTodoInput);
    }

    updateTodo(id: number, updateTodoInput: UpdateTodoInput) {
        return this.todoService.updateTodo(id, updateTodoInput);
    }

    @Mutation(() => Boolean, { name: "deleteTodo" })
    removeTodo(
        @Args('deleteTodoInput', { type: () => Int }) // especifica el tipo de dato para graphql type: () => Int
        deleteTodoInput: DeleteTodoInput
    ) {
        return this.todoService.removeTodo(deleteTodoInput);
    }

    //agregations

    @Query(() => Int, { name: "totalTodos" })
    totalTodos(): number {
        return this.todoService.totalTodos;
    }


    @Query(() => Int, { name: "totalTodosByStatus" })
    getTotalTodosByStatus(
        @Args('status') status: boolean
    ) {
        return this.todoService.totalTodosByStatus(status);
    }

    @Query(() => AggregationsType)
    aggregations(): AggregationsType {

        return {
            pending: this.todoService.totalTodosByStatus(false),
            completed: this.todoService.totalTodosByStatus(true),
            totalCompleted: this.todoService.totalTodosByStatus(true),
            total: this.todoService.totalTodos
        }
    }
}
