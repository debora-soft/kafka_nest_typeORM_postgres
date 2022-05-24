import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';
import { User } from './userInterfoce';

@Controller('user')
export class UserController {
    @Client({
        transport: Transport.KAFKA,
        options: {
            client: {
                clientId: 'user',
                brokers: ['localhost:9092'],
            },
            consumer:{
                groupId: 'user_consumer'
            }
        }
    })
    client: ClientKafka;
    async onModuleInit() {
        this.client.subscribeToResponseOf('create.user');
        this.client.subscribeToResponseOf('update.user');
        this.client.subscribeToResponseOf('delete.user');
        this.client.subscribeToResponseOf('get.user');
        await this.client.connect();
        }

        @Post("/")
        createUser(@Body() user: User) {
            return this.client.send('create.user', user)
        }

        @Patch("/")
        updateUser(@Body() user: User) {
        return this.client.send('update.user', user)
        
        }

        @Delete("/")
        deletUser(@Query() user: User) {
            return this.client.send('delete.user', user)
        }
        @Get("/get")
        getUser(@Query() user: User) {
            return this.client.send('get.user', user.userID)
        }   

}


