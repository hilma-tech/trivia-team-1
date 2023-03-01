import { Controller, Get, Body, Post, Param, Put, Delete, ParseIntPipe } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { AddScoreDto, DeleteQuizDto } from './quiz.dto';

@Controller('api/quiz')
export class QuizController {
    constructor(private readonly quizService: QuizService) { 
        
    }
    @Get("/:id")
    async getQuiz(@Param('id', ParseIntPipe) id:number ){
        this.quizService.getQuiz(id);
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
    async addQuizScore( @Body() addScore: AddScoreDto, @Param() id: number ){
        return await this.quizService.addScore(addScore, id);
    }

    @Post("/:id")
    async deleteQuiz( @Body("id") idForDelete: DeleteQuizDto["id"] ){
        return await this.quizService.deleteQuiz(idForDelete);
    }
}