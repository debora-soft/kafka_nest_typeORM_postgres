import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './todo/todo.entity';


@Module({
  imports: [TodoModule, 
  TypeOrmModule.forRoot({
    type: 'postgres',
    port: 5432,
    database: 'todo_list',
    password: 'password',
    username: 'postgres',
    entities: [Todo],
    synchronize: true

  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
