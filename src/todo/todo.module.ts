import { Module } from '@nestjs/common';
import { TodoResolver } from './todo.resolver';
import { TodoService } from './service/todo/todo.service';

@Module({
  providers: [TodoResolver,TodoService]
})
export class TodoModule {}
