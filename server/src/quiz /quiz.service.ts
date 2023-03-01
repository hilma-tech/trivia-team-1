import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Quiz } from 'src/entities/quiz.entity';
import { Score } from 'src/entities/score.entity';
import { Any, Repository } from 'typeorm';
import { ScoreObj, Scores } from './interfaces';

@Injectable()
export class QuizService {
    constructor(@InjectRepository(Quiz)
    private readonly quizRepository: Repository<Quiz>
    ) { }

    async highScores(quizId: number) {
        console.log('quizId: ', quizId);

        let res = await this.quizRepository.findOne({ where: { id: quizId }, relations: { scores: true } });
        let { title, scores } = res

        scores.sort((a: ScoreObj, b: ScoreObj) => {
            if (b.score !== a.score) return b.score - a.score;
            return a.date.getTime() - b.date.getTime();
        });
        scores.slice(0, 1)
        console.log('scores: ', scores.slice(0, 2));
        return { title, scores }
    }
}
