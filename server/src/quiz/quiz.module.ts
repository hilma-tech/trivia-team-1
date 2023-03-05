import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from 'src/entities/question.entity';
import { Quiz } from 'src/entities/quiz.entity';
import { Score } from 'src/entities/score.entity';
import { QuizController } from './quiz.controller';
import { QuizService } from './quiz.service';

@Module({
<<<<<<< HEAD:server/src/quiz /quiz.module.ts
  imports: [TypeOrmModule.forFeature([Quiz, Score])],
=======
  imports: [TypeOrmModule.forFeature([Quiz,Question])],
>>>>>>> 81e447fb7310c1ea8379203fecd458e35fc6b60c:server/src/quiz/quiz.module.ts
  controllers: [QuizController],
  providers: [QuizService],
  exports:[QuizService]
})
export class QuizModule {}
