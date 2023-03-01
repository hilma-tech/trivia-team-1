import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from 'src/entities/question.entity';
import { Quiz } from 'src/entities/quiz.entity';
import { Repository } from 'typeorm';
import { QuizDTO } from './quiz.dto';

@Injectable()
export class QuizService {
    constructor(
        @InjectRepository(Quiz)
        private readonly quizRepository: Repository<Quiz>,
        @InjectRepository(Question)
        private readonly questionRepository: Repository<Question>
    ) { }

    async addQuiz(quiz: QuizDTO) {
        const { ...rest } = quiz;
        this.quizRepository.save({ ...rest })
    }
    async editQuiz(id: number, quiz: QuizDTO) {
        const { title, description, imageUrl } = quiz
        await this.questionRepository.delete({ quiz: { id: id, title: title, description: description, imageUrl: imageUrl } })
        await this.quizRepository.save({ id: id, ...quiz })
    }
}
