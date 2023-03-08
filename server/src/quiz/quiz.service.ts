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
        const { questions, creatorId, ...rest } = quiz;

        const newQuestions = questions.map((question) => {
            return {
                title: question.title,
                answers: question.answers,
                imageUrl: question.imageUrl
            }
        })

        return this.quizRepository.save({ questions: newQuestions, creator: { id: creatorId }, ...rest })
    }
    async editQuiz(id: number, quiz: QuizDTO) {

        await this.quizRepository.save({ id: id, ...quiz })
    }
}
