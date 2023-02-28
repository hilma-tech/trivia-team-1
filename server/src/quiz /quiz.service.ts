import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Quiz } from 'src/entities/quiz.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QuizService {
    constructor(@InjectRepository(Quiz)
    private readonly ChasesRepository: Repository<Quiz>
    ) {
    }
}
