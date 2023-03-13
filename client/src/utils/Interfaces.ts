export interface Answer {
    text: string;
    isCorrect: boolean;
    imageUrl: string;
}

export interface CurrentQuestion {
    questionId: number;
    title: string;
    answers: Answer[];
    imageUrl?: string;
}

export type Question = Required<CurrentQuestion>;

interface ScoreObj {
    id: number;
    player: string;
    score: number;
    date: string;
};

export interface HighScoreProps {
    score: ScoreObj
    index: number;
}

export interface quizDataState {
    title: string;
    scores: ScoreObj[]
}


