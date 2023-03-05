import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
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
      return isMatch ? {id: user.id, username: user.username, quizzes: user.quizzes}: isMatch;
    }
    else
     return false;
  }
}