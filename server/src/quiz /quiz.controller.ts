import { Controller, Get, Body, Post, Param, Put, Delete } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { DeleteQuizDto } from './quiz.dto';

@Controller('api/quiz')
export class QuizController {
    constructor(private readonly quizService: QuizService) { 
        
    }
    @Get("/:id")
    getQuiz(){
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
    getQuizScores(){
        return "hello smidth"
    }

    @Post("/:id/scores")
    addQuizScore(){
        return "hello rrttrhgkjjhfgmhfjghiyhcghniyjnjktghmuthyjudefrghjk"
    }

    @Post("/:id")
    async deleteQuiz( @Body("id") idForDelete: DeleteQuizDto["id"] ){
        return await this.quizService.deleteQuiz(idForDelete);
    }
    
}