export interface Answers{
    text: string;
    isCorrect: boolean;
    imageUrl: string;
}



export interface CurrentQuestion {
    questionId: number;
    title: string;
    answers: Answers[];
    imageUrl?:string;
}

export type Question = Required<CurrentQuestion>;



