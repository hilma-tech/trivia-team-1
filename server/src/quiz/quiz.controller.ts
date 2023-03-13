import { Controller, Get, Body, Post, Param, Put, Delete, ParseIntPipe } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { QuizDTO, ScoreDTO } from './quiz.dto';


@Controller('api/quiz')
export class QuizController {
    constructor(private readonly quizService: QuizService) {

    }
    @Get("/:id")
    getQuiz(@Param('id', ParseIntPipe) id: number) {
        return this.quizService.getQuiz(id);
    }

    @Post("/")
    async addQuiz(@Body() quiz: QuizDTO) {
        const newQuiz = await this.quizService.addQuiz(quiz);
        return newQuiz.id
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
    async deleteQuiz(@Param("id", ParseIntPipe) id: number) {
        return await this.quizService.deleteQuiz(id);
    }

    //TODO: temporary
    @Post("add-fake-data")
    addFakeData(@Body() userIds: Array<number>) {
        this.quizService.addFakeData(userIds, 5);
    }
}


