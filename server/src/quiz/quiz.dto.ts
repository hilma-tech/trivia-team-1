import { ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class QuizDTO {
    @IsString()
    @IsNotEmpty()
    creatorId: string;

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
    @ArrayMinSize(1)
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
    @ArrayMinSize(1)
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
}

export class ScoreDTO {
    @IsNumber()
    @IsNotEmpty()
    score: number;

    @IsString()
    @IsNotEmpty()
    player: string;
}