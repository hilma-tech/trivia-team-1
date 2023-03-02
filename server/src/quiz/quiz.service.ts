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

    async highScores(quizId: number) {
        const res = await this.quizRepository.findOne({ where: { id: quizId }, relations: { scores: true } });
        let { title, scores } = res
        scores.sort((a, b) => {
            if (b.score !== a.score) return b.score - a.score;
            return new Date(a.date).getTime() - new Date(b.date).getTime();
        });
        scores = scores.slice(0, 5)
        return { title, scores }
    }
}
