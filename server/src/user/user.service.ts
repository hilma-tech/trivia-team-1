import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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

  async register(username: string, password: string | Buffer) {
    let cryptPass: string = await bcrypt.hash(password, 15)
    this.userRepository.save({ username: username, password: { password: cryptPass } })
  }

  async checkUsernameExists(username: string) {
    const user = await this.userRepository.find({ where: { username: username } })
    return user.length > 0;
  }

  async checkLoginValidation(username: string, password: string | Buffer) {
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