import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizModule } from './quiz/quiz.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule,
    QuizModule,
    TypeOrmModule.forRoot({
      username: "root",
      password: "z10mz10m",
      type: "mysql",
      database: "monkey_quiz",
      port: 3306,
      synchronize: true,
      logging: true,
      entities: ["dist/**/*.entity{.ts,.js}"]
    })
  ],
})
export class AppModule {}
