export interface Answers{
    text: string;
    isCorrect: boolean;
    imageUrl: string;
}



export interface CurrentQuestion {
    questionId: number;
    questionTitle: string;
    answers: Answers[];
}

export type Question = Required<CurrentQuestion>;



