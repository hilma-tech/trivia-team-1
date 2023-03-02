import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
<<<<<<< HEAD
import { Quiz } from 'src/entities/quiz.entity';
=======
import { Password } from 'src/entities/password.entity';
>>>>>>> 47fd2e3757f5f62cc619acdd7d42dc7b500703a5
import { User } from 'src/entities/user.entity';
import { DeepPartial, RelationId, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
<<<<<<< HEAD
    constructor(@InjectRepository(User)
    private readonly userRepository: Repository<User>
    ) {
    }

    async getUserQuizzes(userId: number):Promise<User>{
        const user = this.userRepository.findOne({where: {id: userId}, relations: {quizzes:true}});
        return user;

    }
}
=======
  constructor(@InjectRepository(User)
  private readonly userRepository: Repository<User>
  ) {
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
>>>>>>> 47fd2e3757f5f62cc619acdd7d42dc7b500703a5
