import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtendedUser } from 'src/entities/user.entity';
import { DeepPartial, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker/locale/he';
import { SALT } from '@hilma/auth-nest';
import { UserConfig, UserService as AuthUserService } from '@hilma/auth-nest';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class UserService extends AuthUserService {
  constructor(
  @Inject('USER_MODULE_OPTIONS') protected config_options: UserConfig,
  @InjectRepository(ExtendedUser)
  protected readonly userRepository: Repository<ExtendedUser>,
  protected readonly jwtService: JwtService,
  protected readonly configService: ConfigService,
) {
  super(config_options, userRepository, jwtService, configService);

  }

  async getUserQuizzes(userId: string) {

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



  //TODO: temporary
  async addFakeData(amount: number) {
    const users: DeepPartial<ExtendedUser>[] = [];
    for (let i = 0; i < amount; i++) {
      users.push(this.randomizeUser());
    }
    const results = await this.userRepository.save(users);
    return results.map((user) => user.id);
  }

  //TODO: temporary
  randomizeUser() {
    return {
      password: bcrypt.hashSync(faker.internet.password(), SALT),
      username: faker.internet.userName()
    };
  }


}
