import { Injectable } from '@nestjs/common';
import { UserInterface } from '../interfaces/user.message';
import { DeleteResult, getRepository, UpdateResult } from 'typeorm';
import { User } from './user.entity';


@Injectable()
export class UserService {
   user: UserInterface
    constructor() {
        this.user = new User()
    }
    
    async createUser(user: UserInterface): Promise<User> { 
        const userID = user.userID; 
        const userName = user.userName
        return await getRepository(User).save({userID, userName})   
    }

    async updateUser(user: UserInterface): Promise<UpdateResult> {         
        const userID = user.userID;        
        const userName = user.userName;       
        return  await getRepository(User).update(userID, {userName});
                
    }

    async deleteUser(user: UserInterface): Promise<DeleteResult> { 
        const userID = user.userID; 
        return await getRepository(User).delete(userID);
    }
    
    async getUser(user: string): Promise<User> { 
        const userID = user; 
        return await getRepository(User).findOne(userID);            
    }

}
