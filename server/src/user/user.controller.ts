import { Controller, Get, Body, Post, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('api/user')
export class UserController {
    constructor(private readonly userService: UserService) { 
        
    }

    @Post("/register")
    register() {
        return "hello smidth"
    }

    @Post("/login")
    login() {
        return "hello smidth"
    }

    @Get("/:id/quizzes")
    getUserQuizzes(){
        return "hello smidth"
    }

    
}