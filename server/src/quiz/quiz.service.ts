import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from 'src/entities/question.entity';
import { Quiz } from 'src/entities/quiz.entity';
import { Repository } from 'typeorm';
import { QuizDTO } from './quiz.dto';

@Injectable()
export class QuizService {
    constructor(@InjectRepository(Quiz)
    private readonly quizRepository: Repository<Quiz>
    ) {}

    async addQuiz(quiz: QuizDTO) {
        const { ...rest } = quiz;
        this.quizRepository.save({ ...rest })
    }
    async edizQuiz(){
        
    }
}
