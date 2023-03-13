import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from 'src/entities/question.entity';
import { Quiz } from 'src/entities/quiz.entity';
import { ScoreModule } from 'src/score/score.module';
import { QuizController } from './quiz.controller';
import { QuizService } from './quiz.service';

@Module({
  imports: [TypeOrmModule.forFeature([Quiz, Question]), ScoreModule],
  controllers: [QuizController],
  providers: [QuizService],
  exports: [QuizService]
})

export class QuizModule { }