import { Controller, Get, Body, Post, Param, Put, Delete } from '@nestjs/common';
import { Scores } from './interfaces';
import { QuizService } from './quiz.service';


@Controller('api/quiz')
export class QuizController {
    constructor(private readonly quizService: QuizService) {

    }
    @Get("/:id")
    getQuiz() {
        return "hello smidth"
    }

    @Post("/")
    register() {
        return "hello smidth"
    }

    @Put("/:id")
    login() {
        return "hello smidth"
    }

    @Get("/:id/scores")
    getQuizScores(@Param('id') id: number) {
        return this.quizService.highScores(id)
    }

    @Post("/:id/scores")
    addQuizScore() {
        return "hello rrttrhgkjjhfgmhfjghiyhcghniyjnjktghmuthyjudefrghjk"
    }

    @Delete("/:id")
    deleteQuiz() {
        return "hello smidth"
    }

}