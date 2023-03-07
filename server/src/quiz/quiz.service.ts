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
        scores.sort((a, b) => {//sort by score descending then by date ascending
            if (b.score !== a.score) return b.score - a.score;
            return new Date(a.date).getTime() - new Date(b.date).getTime();
        });
        scores = scores.slice(0, 5)
        return { title, scores }
    }
    async deleteQuiz(quizId: number) {
        await this.quizRepository.delete( quizId );
    }
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
