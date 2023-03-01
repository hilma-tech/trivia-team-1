import { Controller, Get, Body, Post, Param, Put, Delete, ParseIntPipe } from '@nestjs/common';
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
        return "quiz added successfully"
    }

    @Put("/:id")
    editQuiz(@Param('id', ParseIntPipe) id: number,@Body() quiz: QuizDTO) {
        this.quizService.editQuiz(id,quiz);
        return "quiz edited successfully"
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