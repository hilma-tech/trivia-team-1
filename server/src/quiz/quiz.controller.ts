import { Controller, Get, Body, Post, Param, Put, Delete, ParseIntPipe } from '@nestjs/common';
<<<<<<< HEAD:server/src/quiz /quiz.controller.ts
=======
import { QuizDTO } from './quiz.dto';
>>>>>>> 81e447fb7310c1ea8379203fecd458e35fc6b60c:server/src/quiz/quiz.controller.ts
import { QuizService } from './quiz.service';
import { AddScoreDto, DeleteQuizDto } from './quiz.dto';


@Controller('api/quiz')
export class QuizController {
    constructor(private readonly quizService: QuizService) {

    }
    @Get("/:id")
<<<<<<< HEAD
    async getQuiz(@Param('id', ParseIntPipe) id:number ){
        this.quizService.getQuiz(id);
=======
    getQuiz() {
        return "hello smidth"
>>>>>>> 00d285421b87ad21886f320e070e081f87ed2799
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
<<<<<<< HEAD
    async addQuizScore( @Body() addScore: AddScoreDto, @Param("id", ParseIntPipe) id: number ){
        console.log(" controler addScore:", addScore);
        console.log("controler id:", id);

        return await this.quizService.addScore(addScore, id);
    }

    @Post("/:id")
    async deleteQuiz( @Body("id") idForDelete: DeleteQuizDto["id"] ){
        return await this.quizService.deleteQuiz(idForDelete);
    }
=======
    addQuizScore() {
        return "hello rrttrhgkjjhfgmhfjghiyhcghniyjnjktghmuthyjudefrghjk"
    }

    @Delete("/:id")
    deleteQuiz() {
        return "hello smidth"
    }

>>>>>>> 00d285421b87ad21886f320e070e081f87ed2799
}