import { IsInt } from "class-validator";

export class DeleteQuizDto {
    @IsInt()
    readonly id: number;
}