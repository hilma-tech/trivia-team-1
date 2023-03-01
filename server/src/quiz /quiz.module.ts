import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from 'src/entities/quiz.entity';
import { Score } from 'src/entities/score.entity';
import { QuizController } from './quiz.controller';
import { QuizService } from './quiz.service';

@Module({
  imports: [TypeOrmModule.forFeature([Quiz, Score])],
  controllers: [QuizController],
  providers: [QuizService],
  exports:[QuizService]
})
export class QuizModule {}
