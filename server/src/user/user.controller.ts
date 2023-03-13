import { RequestUser, RequestUserType, UseLocalAuth } from '@hilma/auth-nest';
import { Controller, Get, Body, Post, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { RegisterDTO } from './user.dto';
import { UserService } from './user.service';

@Controller('api/user')
export class UserController {
    constructor(private readonly userService: UserService) {

    }

    @Post("/register")
    async register(@Body() user: RegisterDTO) {
        try {
            await this.userService.createUser(user)
            return true
        }
        catch {
            return false
        }
    }

    @UseLocalAuth()
    @Post("login")
    async login(@RequestUser() user: RequestUserType, @Res() res: Response) {
      const body = this.userService.login(user, res);
      return res.send(body);
    }

    @Get("/:id/quizzes")
    async getUserQuizzes(@Param('id') id: string) {
        return await this.userService.getUserQuizzes(id);
    }

    //TODO: temporary
    @Post("add-fake-data")
    addFakeData() {
        return this.userService.addFakeData(10);
    }

}