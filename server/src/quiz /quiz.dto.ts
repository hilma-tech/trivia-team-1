import { IsDate, IsInt, IsNotEmpty, IsString } from "class-validator";

export class DeleteQuizDto {
    @IsInt()
    readonly id: number;
}

export class AddScoreDto {
    @IsString()
    @IsNotEmpty()
    score: string;

    @IsDate()
    date: Date;

    @IsString()
    @IsNotEmpty()
    player: string;
}