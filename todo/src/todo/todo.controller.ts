import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { IKafkaMessage } from 'src/interfaces/kafka.message.interface';
import { ITodo } from 'src/interfaces/todo.interface';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
    constructor(private todoService: TodoService) {}

    @MessagePattern('create.todo')
    createTodo(@Payload() message: IKafkaMessage<ITodo>) {
        return this.todoService.createTodo(message.value)
    }

    @MessagePattern('update.todo')
    updateTodo(@Payload() message: IKafkaMessage<ITodo>) {
        return this.todoService.updateTodo(message.value)
    }

    @MessagePattern('delete.todo')
    deleteTodo(@Payload() message: IKafkaMessage<ITodo>) {
        return this.todoService.deletTodo(message.value)
    }

    @MessagePattern('get.todo')
    getTodo(@Payload() message: IKafkaMessage<ITodo>) {
        return this.todoService.getTodo(message.value)
    }
}
