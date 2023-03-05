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
    async getQuiz(@Param('id', ParseIntPipe) id:number ){
        this.quizService.getQuiz(id);
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
    getQuizScores(){
        return "hello smidth"
    }

    @Post("/:id/scores")
    async addQuizScore( @Body() addScore: AddScoreDto, @Param("id", ParseIntPipe) id: number ){
        console.log(" controler addScore:", addScore);
        console.log("controler id:", id);

        return await this.quizService.addScore(addScore, id);
    }

    @Post("/:id")
    async deleteQuiz( @Body("id") idForDelete: DeleteQuizDto["id"] ){
        return await this.quizService.deleteQuiz(idForDelete);
    }
}