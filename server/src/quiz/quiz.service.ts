import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Quiz } from 'src/entities/quiz.entity';
import { ScoreService } from 'src/score/score.service';
import { Repository } from 'typeorm';
import { QuizDTO } from './quiz.dto';

@Injectable()
export class QuizService {
    constructor(
        @InjectRepository(Quiz)
        private readonly quizRepository: Repository<Quiz>,
        private readonly scoreService: ScoreService
    ) { }

    async addQuiz(quiz: QuizDTO) {
        const { ...rest } = quiz;
        return this.quizRepository.save({ ...rest })
    }
    async editQuiz(id: number, quiz: QuizDTO) {

        await this.quizRepository.save({ id: id, ...quiz })
    }

    async getScores(id: number) {
        const res = await this.quizRepository.findOne({ where: { id }, relations: ['scores'] });
        let { title, scores } = res
        scores.sort((a, b) => {//sort by score descending then by date ascending
            if (b.score !== a.score) return b.score - a.score;
            return a.date.getTime() - b.date.getTime();
        });
        return { title, scores }
    }

    async addScore(id: number, params: { player: string, score: number }) {
        return this.scoreService.addNewScore(id, params);
    }
}
