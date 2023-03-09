import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Quiz } from 'src/entities/quiz.entity';
import { ScoreService } from 'src/score/score.service';
import { DeepPartial, Repository } from 'typeorm';
import { QuizDTO } from './quiz.dto';
import { faker } from '@faker-js/faker/locale/he';
import { Question } from 'src/entities/question.entity';
import { Answer } from 'src/entities/answer.entity';
import { Score } from 'src/entities/score.entity';

@Injectable()
export class QuizService {
    constructor(
        @InjectRepository(Quiz)
        private readonly quizRepository: Repository<Quiz>,
        private readonly scoreService: ScoreService
    ) { }

    async getQuiz(quizId: number) {
        const quiz = await this.quizRepository.find({
            where: { id: quizId },
            relations: {
                scores: true, questions: { answers: true },
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
    //TODO: temporary
    // this should be a string[] when using @hilma/auth
    addFakeData(userIds: number[], amount: number) {
        const quizzes = userIds.flatMap((id) => {
            const userQuizzes: DeepPartial<Quiz>[] = [];
            for (let i = 0; i < amount; i++) {
                userQuizzes.push(this.randomQuiz(id));
            }
            return userQuizzes;
        });
        this.quizRepository.save(quizzes);
    }

    //TODO: temporary
    // this should be a string when using @hilma/auth
    randomQuiz(id: number) {
        const quiz: DeepPartial<Quiz> = {
            creator: { id },
            description: faker.lorem.paragraph(),
            title: faker.lorem.sentence(),
            imageUrl: faker.image.imageUrl(),
            questions: [],
            scores: []
        }

        const amountOfQuestions = faker.datatype.number({ min: 3, max: 10 });
        for (let i = 0; i < amountOfQuestions; i++) {
            quiz.questions.push(this.randomQuestion() as Question);
        }

        const amountOfScores = faker.datatype.number({ min: 3, max: 15 });
        for (let i = 0; i < amountOfScores; i++) {
            quiz.scores.push(this.randomScore() as Score);
        }

        return quiz;
    }

    randomQuestion() {
        const question: DeepPartial<Question> = {
            imageUrl: faker.image.imageUrl(),
            title: faker.lorem.sentence(),
            answers: []
        }

        const amountOfAnswers = faker.datatype.number({ min: 2, max: 4 })
        const correctIndex = faker.datatype.number({ min: 0, max: amountOfAnswers });
        for (let i = 0; i < amountOfAnswers; i++) {
            question.answers.push(this.randomAnswer(correctIndex === i) as Answer);
        }

        return question;
    }

    randomAnswer(isCorrect: boolean) {
        const answer: DeepPartial<Answer> = {
            imageUrl: faker.image.imageUrl(),
            isCorrect,
            text: faker.lorem.sentence(),
        }

        return answer;
    }

    randomScore() {
        const score: DeepPartial<Score> = {
            player: faker.name.fullName(),
            score: faker.datatype.number({ min: 0, max: 100 })
        }

        return score;
    }

    async deleteQuiz(quizId: number) {
        await this.quizRepository.delete(quizId);
    }
}
