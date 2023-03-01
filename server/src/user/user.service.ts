import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Password } from 'src/entities/password.entity';
import { User } from 'src/entities/user.entity';
import { RelationId, Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User)
    private readonly userRepository: Repository<User>
    ) {
    }

    async register(username: string, password: string) {
        this.userRepository.save({ username: username, password: { password } })
    }

    async checkUsernameExists(username: string) {
        const user = await this.userRepository.find({ where: { username: username } })
        return user.length > 0;
    }
}