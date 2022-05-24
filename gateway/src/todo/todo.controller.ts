import { Body, Controller, Delete, Get, Patch, Post, Query } from '@nestjs/common';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';
import { ITodo } from './todoInterface';

@Controller('todo')
export class TodoController {
    @Client({
        transport: Transport.KAFKA,
        options: {
            client: {
                clientId: 'todo',
                brokers: ['localhost:9092'],
            },
            consumer:{
                groupId: 'todo_consumer'
            }
        }
    })
    client: ClientKafka;
    async onModuleInit() {
        this.client.subscribeToResponseOf('create.todo');
        this.client.subscribeToResponseOf('update.todo');
        this.client.subscribeToResponseOf('delete.todo');
        this.client.subscribeToResponseOf('get.todo');
        await this.client.connect();
        }

        @Post("/")
        creatTodo(@Body() todo: ITodo) {
            return this.client.send('create.todo', todo)
        }

        @Patch("/")
        updateTodo(@Body() todo: ITodo) {
        return this.client.send('update.todo', todo)
        
        }

        @Delete("/")
        deletUser(@Query() todo: ITodo) {
            return this.client.send('delete.todo', todo)
        }
        @Get("/get")
        getUser(@Query() todo: ITodo) {
            return this.client.send('get.todo', todo.id)
        }   

}
