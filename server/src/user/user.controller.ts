import { Controller, Get, Body, Post, Param } from '@nestjs/common';
import { RegisterDTO } from './user.dto';
import { UserService } from './user.service';

@Controller('api/user')
export class UserController {
    constructor(private readonly userService: UserService) {

    }

    @Post("/register")
    async register(@Body() { username, password }: RegisterDTO) {
        const userExist = await this.userService.checkUsernameExists(username);
        if (userExist) return false;
        else {
            await this.userService.register(username, password);
            return true;
        }
    }

    @Post("/login")
    async login(@Body() { username, password }: RegisterDTO) {
        return await this.userService.checkLoginValidation(username, password)
    }

    @Get("/:id/quizzes")
    getUserQuizzes() {
        return "hello smidth"
    }
}