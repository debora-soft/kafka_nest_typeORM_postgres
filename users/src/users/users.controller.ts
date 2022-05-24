import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';
import { UserInterface } from '../interfaces/user.message';
import { IKafkaMessage } from '../interfaces/kafka.messaage.interface';

@Controller('users')
export class UsersController {
    constructor(private userService: UserService) {}

    @MessagePattern('create.user')
    createUser(@Payload() message: IKafkaMessage<UserInterface>) {       
        return this.userService.createUser(message.value)                
    }

    @MessagePattern('update.user')
    async updateUser(@Payload() message: IKafkaMessage<UserInterface>) {       
    return this.userService.updateUser(message.value)  
                 
    }

    @MessagePattern('delete.user')
    deleteUser(@Payload() message: IKafkaMessage<UserInterface>) {       
        return this.userService.deleteUser(message.value)                
    }

    @MessagePattern('get.user')
    getUser(@Payload() message: IKafkaMessage<string>) { 
       return this.userService.getUser(message.value)                
    }
}
