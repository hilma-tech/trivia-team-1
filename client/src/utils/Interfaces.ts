export interface Answer{
    text: string;
    isCorrect: boolean;
    imageUrl: string;
}



export interface CurrentQuestion {
    questionId: number;
    title: string;
    answers: Answer[];
    imageUrl?:string;
}

export type Question = Required<CurrentQuestion>;



