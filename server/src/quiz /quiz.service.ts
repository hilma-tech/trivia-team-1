import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Quiz } from 'src/entities/quiz.entity';
import { Score } from 'src/entities/score.entity';
import { Any, Repository } from 'typeorm';
import { ScoreObj, ScoreObjFromDB, Scores } from './interfaces';

@Injectable()
export class QuizService {
    constructor(@InjectRepository(Quiz)
    private readonly quizRepository: Repository<Quiz>
    ) { }

    async highScores(quizId: number) {
        let res = await this.quizRepository.findOne({ where: { id: quizId }, relations: { scores: true } });
        let { title, scores } = res
        let scoresCopy = [...scores]
        console.log('scoresCopy1: ', scoresCopy);
        scoresCopy.sort((a, b) => {
            if (b.score !== a.score) return b.score - a.score;
            return new Date(a.date).getTime() - new Date(b.date).getTime();
        });
        console.log('scoresCopy2: ', scoresCopy);
        scoresCopy = scoresCopy.slice(0, 5)
        console.log('scoresCopy3: ', scoresCopy);
        return { title, scores: scoresCopy }
    }
}
