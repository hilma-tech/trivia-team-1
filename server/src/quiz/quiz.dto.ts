import { ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class QuizDTO {
    @IsString()
    @IsNotEmpty()
    creatorId: string;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsNumber()
    @IsOptional()
    imageUrl?: number;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsArray()
    @ArrayMinSize(1)
    @ArrayMaxSize(20)
    questions: QuestionDTO[];
}

export class QuestionDTO {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsNumber()
    @IsOptional()
    imageUrl: number;

    @IsArray()
    @ArrayMinSize(1)
    @ArrayMaxSize(4)
    answers: AnswerDTO[];
}

export class AnswerDTO {

    @IsString()
    @IsNotEmpty()
    text: string;

    @IsNumber()
    @IsOptional()
    imageUrl: number;

    @IsBoolean()
    @IsNotEmpty()
    isCorrect: boolean;
}

export class ScoreDTO {
    @IsNumber()
    @IsNotEmpty()
    score: number;

    @IsString()
    @IsNotEmpty()
    player: string;
}