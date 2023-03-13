import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { QuizModule } from './quiz/quiz.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule,
    QuizModule,
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      type: "mysql",
      database: process.env.DB_DATABASE,
      port: Number(process.env.DB_PORT),
      synchronize: process.env.TYPEORM_SYNC === "on",
      logging: process.env.TYPEORM_LOG === "on",
      entities: ["dist/**/*.entity{.ts,.js}"]
    })
  ],
})
export class AppModule { }
