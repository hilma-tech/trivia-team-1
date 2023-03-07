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

export interface imageFile{
    link:string , 
    id:number;
}

export type Question = Required<CurrentQuestion>;



