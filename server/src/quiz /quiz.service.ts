import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Quiz } from 'src/entities/quiz.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QuizService {
    constructor(@InjectRepository(Quiz)
    private readonly quizRepository: Repository<Quiz>
    ) { }
    async getQuiz(quizId: number) {
        const quiz = await this.quizRepository.find({
            where: {id: quizId}, 
            relations: {scores: true, questions: {answers: true},
        }
        });
        const quitDesc = {
            id: quiz[0].id,
            title: quiz[0].title,
            description: quiz[0].description,
            imageUrl: quiz[0].imageUrl
        };
        const scoresArr = quiz[0].scores;
        const questionsArr = quiz[0].questions;

        return [quitDesc, scoresArr, questionsArr];
    }
}
