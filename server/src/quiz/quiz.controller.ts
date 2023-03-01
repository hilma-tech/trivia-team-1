import { Controller, Get, Body, Post, Param, Put, Delete } from '@nestjs/common';
import { QuizDTO } from './quiz.dto';
import { QuizService } from './quiz.service';

@Controller('api/quiz')
export class QuizController {
    constructor(private readonly quizService: QuizService) { 
        
    }
    @Get("/:id")
    getQuiz(){
        return "hello smidth"
    }

    @Post("/")
    async addQuiz(@Body() quiz: QuizDTO) {
        this.quizService.addQuiz(quiz);
        return "hello smidth"
    }

    @Put("/:id")
    editQuiz(@Body() quiz: QuizDTO) {
        this.quizService.edizQuiz();
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