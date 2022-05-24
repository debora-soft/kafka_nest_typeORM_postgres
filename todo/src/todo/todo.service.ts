import { Injectable } from '@nestjs/common';
import { ITodo } from 'src/interfaces/todo.interface';
import { DeleteResult, getRepository, UpdateResult } from 'typeorm';
import { Todo } from './todo.entity';

@Injectable()
export class TodoService {
    todo: ITodo
    constructor() {
        this.todo = new Todo()
    }
    
    async createTodo(todo: ITodo): Promise<Todo> { 
        
        const title = todo.title;
        const record = todo.record;
        const idUser = todo.idUser;
        return await getRepository(Todo).save({title, record, idUser})   
    }

    async updateTodo(todo: ITodo): Promise<UpdateResult> {  
        const id = todo.id;       
        const title = todo.title;
        const record = todo.record;      
        return  await getRepository(Todo).update(id, {title, record});
                
    }

    async deletTodo(todo: ITodo): Promise<DeleteResult> { 
        const id = todo.id; 
        return await getRepository(Todo).delete(id);
    }
    
    async getTodo(todo: ITodo): Promise<Todo> { 
        const id = todo.id; 
        return await getRepository(Todo).findOne(id);       
        
    }
}
