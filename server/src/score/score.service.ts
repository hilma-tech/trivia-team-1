import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Score } from 'src/entities/score.entity';
import { ScoreDTO } from 'src/quiz/quiz.dto';

@Injectable()
export class ScoreService {
    constructor(
        @InjectRepository(Score)
        private readonly scoreRepository: Repository<Score>
    ) { }

    async addNewScore(id: number, score: ScoreDTO) {
        let newScore = await this.scoreRepository.save({ ...score, quiz: { id } });
        return { id: newScore.id }
    }
}
