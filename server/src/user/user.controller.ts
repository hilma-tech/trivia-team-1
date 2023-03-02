import { Controller, Get, Body, Post, Param } from '@nestjs/common';
import { RegisterDTO } from './user.dto';
import { UserService } from './user.service';

@Controller('api/user')
export class UserController {
    constructor(private readonly userService: UserService) {

    }

    @Post("/register")
    async register(@Body() { username, password }: RegisterDTO) {
        const userExist = await this.userService.doesUsernameExist(username);
        if (userExist) return false;
        else {
            await this.userService.register(username, password);
            return true;
        }
    }

    @Post("/login")
    async login(@Body() { username, password }: RegisterDTO) {
        return await this.userService.validateLogin(username, password)
    }

    @Get("/:id/quizzes")
<<<<<<< HEAD
       async getUserQuizzes(@Param('id') id: number) {
            const user = await this.userService.getUserQuizzes(id)
            return user.quizzes
    }

=======
    getUserQuizzes() {
        return "hello smidth"
    }
>>>>>>> 47fd2e3757f5f62cc619acdd7d42dc7b500703a5
}