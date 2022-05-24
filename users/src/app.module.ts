import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [UsersModule, 
  TypeOrmModule.forRoot({
    type: 'postgres',
    port: 5432,
    database: 'todo_users',
    password: 'password',
    username: 'postgres',
    entities: [User],
    synchronize: true
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
