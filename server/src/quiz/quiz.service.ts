import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Quiz } from 'src/entities/quiz.entity';
import { Repository } from 'typeorm';
import { QuizDTO } from './quiz.dto';

@Injectable()
export class QuizService {
    constructor(
        @InjectRepository(Quiz)
        private readonly quizRepository: Repository<Quiz>,
    ) { }

    async addQuiz(quiz: QuizDTO) {
        const { ...rest } = quiz;
        return this.quizRepository.save({ ...rest })
    }
    async editQuiz(id: number, quiz: QuizDTO) {
  
        await this.quizRepository.save({ id: id, ...quiz })
    }
    async deleteQuiz(quizId: number) {
        await this.quizRepository.delete( quizId );
    }
}
