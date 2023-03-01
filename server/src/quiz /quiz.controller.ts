import { Controller, Get, Body, Post, Param, Put, Delete, ParseIntPipe } from '@nestjs/common';
import { QuizService } from './quiz.service';

@Controller('api/quiz')
export class QuizController {
    constructor(private readonly quizService: QuizService) { 
        
    }
    @Get("/:id")
    async getQuiz(@Param('id', ParseIntPipe) id:number ){
        const quiz = await this.quizService.getQuiz(id);
        return quiz;
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
    getQuizScores(){
        return "hello smidth"
    }

    @Post("/:id/scores")
    addQuizScore(){
        return "hello rrttrhgkjjhfgmhfjghiyhcghniyjnjktghmuthyjudefrghjk"
    }

    @Delete("/:id")
    deleteQuiz(){
        return "hello smidth"
    }
    
}