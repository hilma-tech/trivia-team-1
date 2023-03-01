import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Quiz } from 'src/entities/quiz.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User)
    private readonly userRepository: Repository<User>
    ) {
    }

    async getUserQuizzes(userId: number):Promise<User>{
        const user = this.userRepository.findOne({where: {id: userId}, relations: {quizzes:true}});
        return user;

    }
}
