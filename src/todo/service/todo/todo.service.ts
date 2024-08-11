import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from 'src/todo/entity/todo.entity';
import { CreateTodoInput } from '../../dtos/inputs/create-todo.input';
import { DeleteTodoInput } from 'src/todo/dtos/inputs/delete-todo.input';
import { UpdateTodoInput } from 'src/todo/dtos/inputs/update-todo.input';
import { StatusArgs } from './../../dtos/args/status.args';


@Injectable()
export class TodoService {

    private todos: Todo[] = [
        {
            id: 3,
            description: "test1",
            done: false
        },
        {
            id: 2,
            description: "test2",
            done: false
        },
        {
            id: 1,
            description: "test3",
            done: true
        },
        {
            id: 4,
            description: "test4",
            done: true
        }
    ]

    get totalTodos() {
        return this.todos.length;
    }

    totalTodosByStatus(status: boolean): number {
        return this.todos.filter(todo => todo.done === status).length;
    }

    findAll(args: StatusArgs) {
        
        if(typeof args.status !== 'undefined') return this.todos.filter(todo => todo.done === args.status);
        return this.todos;
    }

    findById(id: number) {
        const todo = this.todos.find(todo => todo.id === id);
        if (!todo) throw new NotFoundException("No hay resultados");
        return todo;
    }

    createTodo(createTodoInput: CreateTodoInput) {
        const id = this.todos.length + 1;
        const todo: Todo = {
            ...createTodoInput,
            id,
            done: false
        };

        this.todos.push(todo);
        return todo;
    }

    removeTodo({ id }: DeleteTodoInput) {
        this.findById(id);
        this.todos = this.todos.filter(todo => todo.id !== id);
        return true;
    }

    updateTodo(id: number, { description, done }: UpdateTodoInput) {
        const todo = this.findById(id);
        if(description) todo.description = description;
        if(done !== undefined) todo.done = done;

        this.todos = this.todos.map(el => {
            return (el.id === id) ? todo : el;
        });

        return todo;
    }
}
