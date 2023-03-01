import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Quiz } from 'src/entities/quiz.entity';
import { Score } from 'src/entities/score.entity';
import { Repository } from 'typeorm';
import { AddScoreDto } from './quiz.dto';

@Injectable()
export class QuizService {
    constructor(
        @InjectRepository(Quiz)
        private readonly quizRepository: Repository<Quiz>,
        @InjectRepository(Score)
        private readonly scoreRepository: Repository<Score>
    ) {}
    async deleteQuiz(quizId: number) {
        await this.quizRepository.delete(quizId);
    }
    async addScore(scoreParams: AddScoreDto, id: number) {
        return this.scoreRepository.save(scoreParams, id);
    }
}
