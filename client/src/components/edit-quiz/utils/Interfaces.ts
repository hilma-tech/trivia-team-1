export interface CurrentQuestion {
    questionId: number;
    questionTitle: string;
    answers: string[];
    correctAnswer?: number;
}

export type Question = Required<CurrentQuestion>;



