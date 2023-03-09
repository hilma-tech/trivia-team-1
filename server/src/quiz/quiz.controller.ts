import { Controller, Get, Body, Post, Param, Put, Delete, ParseIntPipe } from '@nestjs/common';
import { QuizDTO, ScoreDTO } from './quiz.dto';
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
    async addQuiz(@Body() quiz: QuizDTO) {
        return await this.quizService.addQuiz(quiz);
    }

    @Put("/:id")
    editQuiz(@Param('id', ParseIntPipe) id: number, @Body() quiz: QuizDTO) {
        this.quizService.editQuiz(id, quiz);
    }

    @Get("/:id/scores")
    getQuizScores(@Param('id', ParseIntPipe) id: number) {
        return this.quizService.getScores(id)
    }

    @Post("/:id/scores")
    addQuizScore(@Param("id", ParseIntPipe) id: number, @Body() score: ScoreDTO) {
        return this.quizService.addScore(id, score);
    }

    @Delete("/:id")
    deleteQuiz() {
        return "hello smidth"
    }

}