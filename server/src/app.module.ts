import { FilesHandlerModule } from '@hilma/fileshandler-server';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from './config';

import { QuizModule } from './quiz/quiz.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule,
    QuizModule,
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      isGlobal: true,
      load: [config]
    }),
    TypeOrmModule.forRoot({
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      type: "mysql",
      database: process.env.DB_DATABASE,
      port: Number(process.env.DB_PORT),
      synchronize: process.env.TYPEORM_SYNC === "on",
      logging: process.env.TYPEORM_LOG === "on",
      entities: ["dist/**/*.entity{.ts,.js}", "node_modules/@hilma/auth-nest/**/*.entity{.ts,.js}"]
    }),
    FilesHandlerModule.register({
      folder: "/home/hilma/hilma-ptojects/Trivia-Proj-1/server/uploads",
      autoAllow: true
    })
  ],
})
export class AppModule { }
