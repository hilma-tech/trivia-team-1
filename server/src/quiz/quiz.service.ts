import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { faker } from '@faker-js/faker/locale/he';
import { Quiz } from 'src/entities/quiz.entity';
import { Question } from 'src/entities/question.entity';
import { Answer } from 'src/entities/answer.entity';
import { Score } from 'src/entities/score.entity';
import { ScoreService } from 'src/score/score.service';
import { QuizDTO } from './quiz.dto';
import { FilesType, ImageService } from '@hilma/fileshandler-server';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Quiz)
    private readonly quizRepository: Repository<Quiz>,
    private readonly scoreService: ScoreService,
    private readonly imageService: ImageService
  ) { }

  async saveQuiz(quiz: QuizDTO, files: FilesType, id?: number) {
    const { questions, imageUrl, creatorId, ...rest } = quiz;

    const newQuestions = await Promise.all(questions.map(async (question) => {
      const newAnswers = await Promise.all(question.answers.map(async (answer) => {
        if (typeof answer.imageUrl === "string") return {
          ...answer,
          imageUrl: answer.imageUrl
        };

        if (answer.imageUrl > -1) {
          const answerImageUrl = await this.imageService.save(files, answer.imageUrl);
          return {
            ...answer, imageUrl: answerImageUrl
          }
        }

        return {
          ...answer,
          imageUrl: undefined
        };
      }));

      if (typeof question.imageUrl === "string") {
        return {
          title: question.title,
          answers: newAnswers,
          imageUrl: question.imageUrl
        }
      }

      if (question.imageUrl > -1) {
        const questionImageUrl = await this.imageService.save(files, question.imageUrl);
        return {
          title: question.title,
          answers: newAnswers,
          imageUrl: questionImageUrl
        }
      }

      return {
        title: question.title,
        answers: newAnswers,
        imageUrl: undefined
      }
    }))

    if (typeof imageUrl === "string") {
      return this.quizRepository.save({ id, questions: newQuestions, creator: { id: creatorId }, imageUrl, ...rest })
    }

    if (imageUrl > -1) {
      const quizImageUrl = await this.imageService.save(files, imageUrl);
      return this.quizRepository.save({ id, imageUrl: quizImageUrl, questions: newQuestions, creator: { id: creatorId }, ...rest })
    }

    return this.quizRepository.save({ id, questions: newQuestions, creator: { id: creatorId }, ...rest });
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
  async getQuiz(quizId: number) {
    const quiz = await this.quizRepository.findOne({
      where: { id: quizId },
      relations: { scores: true, questions: { answers: true } },
    });

    return quiz;
  }


  //TODO: temporary
  addFakeData(userIds: string[], amount: number) {
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
  randomQuiz(id: string) {
    const quiz: DeepPartial<Quiz> = {
      creator: { id },
      description: faker.commerce.productDescription(),
      title: faker.commerce.productName(),
      imageUrl: faker.image.imageUrl(640, 480, undefined, true),
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

  //TODO: temporary
  randomQuestion() {
    const question: DeepPartial<Question> = {
      imageUrl: faker.image.imageUrl(640, 480, undefined, true),
      title: faker.commerce.productName(),
      answers: []
    }

    const amountOfAnswers = faker.datatype.number({ min: 2, max: 4 })
    const correctIndex = faker.datatype.number({ min: 0, max: amountOfAnswers });
    for (let i = 0; i < amountOfAnswers; i++) {
      question.answers.push(this.randomAnswer(correctIndex === i) as Answer);
    }

    return question;
  }


  //TODO: temporary
  randomAnswer(isCorrect: boolean) {
    const answer: DeepPartial<Answer> = {
      imageUrl: faker.image.imageUrl(640, 480, undefined, true),
      isCorrect,
      text: faker.commerce.productName(),
    }

    return answer;
  }

  //TODO: temporary
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
