import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { DeepPartial, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { faker } from '@faker-js/faker/locale/he';

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
      if (isMatch) return { id: user.id, username: user.username };
      return false;
    }
    else
      return false;
  }

  //TODO: temporary
  //TODO: change this when using @hilma/auth-nest
  async addFakeData(amount: number) {
    const users: DeepPartial<User>[] = [];
    for (let i = 0; i < amount; i++) {
      users.push(this.randomizeUser());
    }
    const results = await this.userRepository.save(users);
    return results.map((user) => user.id);
  }

  //TODO: temporary
  //TODO: change this when using @hilma/auth-nest
  randomizeUser() {
    return {
      password: {
        password: bcrypt.hashSync(faker.internet.password(), 15),
      },
      username: faker.internet.userName()
    };
  }

  
}
