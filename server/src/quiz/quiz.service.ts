import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Quiz } from 'src/entities/quiz.entity';
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
  ) { }

  async editQuiz(id: number, quiz: QuizDTO) {
    await this.quizRepository.save({ id: id, ...quiz });
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

  async highScores(quizId: number) {
    const res = await this.quizRepository.findOne({
      where: { id: quizId },
      relations: { scores: true },
    });
    let { title, scores } = res;
    scores.sort((a, b) => {
      //sort by score descending then by date ascending
      if (b.score !== a.score) return b.score - a.score;
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
    scores = scores.slice(0, 5);
    return { title, scores };
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
