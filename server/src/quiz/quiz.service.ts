import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Quiz } from 'src/entities/quiz.entity';
import { Score } from 'src/entities/score.entity';
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

    async highScores(id: number) {
        const res = await this.quizRepository.findOne({ where: { id }, relations: ['scores'] });
        let { title, scores } = res
        scores.sort((a, b) => {//sort by score descending then by date ascending
            if (b.score !== a.score) return b.score - a.score;
            return a.date.getTime() - b.date.getTime();
            // return new Date(a.date).getTime() - new Date(b.date).getTime();
        });
        // scores = scores.slice(0, 5)
        return { title, scores }
    }
    async addScore(id: number, params: { player: string, score: number }) {
        const quiz = await this.quizRepository.findOne({ where: { id }, relations: ['scores'] });
        const scoreObj = new Score();
        scoreObj.player = params.player;
        scoreObj.score = params.score;
        quiz.scores.push(scoreObj)
        await this.quizRepository.save(quiz)
        return { id: scoreObj.id }
    }
}
