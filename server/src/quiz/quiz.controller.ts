import { Controller, Get, Body, Post, Param, Put, Delete, ParseIntPipe } from '@nestjs/common';
import { QuizDTO } from './quiz.dto';
import { QuizService } from './quiz.service';


@Controller('api/quiz')
export class QuizController {
    constructor(private readonly quizService: QuizService) {

    }
    @Get("/:id")
    async getQuiz(@Param('id', ParseIntPipe) id:number ){
        return await this.quizService.getQuiz(id);
    }

    @Post("/")
    async addQuiz(@Body() quiz: QuizDTO) {
        const newQuiz=await this.quizService.addQuiz(quiz);
        return  newQuiz.id
    }

    @Put("/:id")
    editQuiz(@Param('id', ParseIntPipe) id: number,@Body() quiz: QuizDTO) {
        this.quizService.editQuiz(id,quiz);
        return 
    }

    @Get("/:id/scores")
    getQuizScores(@Param('id', ParseIntPipe) id: number) {
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