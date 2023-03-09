import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Quiz } from 'src/entities/quiz.entity';
import { Password } from 'src/entities/password.entity';
import { User } from 'src/entities/user.entity';
import { DeepPartial, RelationId, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User)
    private readonly userRepository: Repository<User>
    ) {
    }

    async getUserQuizzes(userId: number){
      
        const user = await this.userRepository.findOne({
          where: { id: userId },
          relations: {
            quizzes: {
              questions: true,
            },
          },
        });
        const quizzes = user.quizzes;;
        // user.quizzes.map(quiz=> quizzes.push(
        //   {title: quiz.title, description: quiz.description,id:quiz.id,imageUrl: quiz.imageUrl,questions: quiz.questions.length}
        //   ))          
        return quizzes;

    }
  async register(username: string, password: string | Buffer) {
    const hashedPassword: string = await bcrypt.hash(password, 15)
    this.userRepository.save({ username: username, password: { password: hashedPassword } })
  }

  async doesUsernameExist(username: string) {
    const user = await this.userRepository.find({ where: { username: username } })
    return user.length > 0;
  }

  async validateLogin(username: string, password: string | Buffer) {
    const user = await this.userRepository.findOne({
      where: { username: username },
      relations: ['password']
    });

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password.password)
      return isMatch;
    }
    else
     return false;
  }
}
