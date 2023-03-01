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
}