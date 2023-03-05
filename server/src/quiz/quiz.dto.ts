<<<<<<< HEAD:server/src/quiz /quiz.dto.ts
import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class DeleteQuizDto {
    @IsInt()
    readonly id: number;
}

export class AddScoreDto {
    @IsString()
    @IsNotEmpty()
    score: string;

    @IsString()
    @IsNotEmpty()
    player: string;
=======
import { ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class QuizDTO {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsOptional()
    imageUrl?: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsArray()
    @ArrayMinSize(4)
    @ArrayMaxSize(20)
    questions: QuestionDTO[];
}

export class QuestionDTO {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsOptional()
    imageUrl: string;

    @IsArray()
    @ArrayMinSize(2)
    @ArrayMaxSize(4)
    answers: AnswerDTO[];
}

export class AnswerDTO {

    @IsString()
    @IsNotEmpty()
    text: string;
    @IsString()
    @IsOptional()
    imageUrl: string;
    @IsBoolean()
    @IsNotEmpty()
    isCorrect: boolean;
>>>>>>> 81e447fb7310c1ea8379203fecd458e35fc6b60c:server/src/quiz/quiz.dto.ts
}