export interface Answers {
    text: string;
    isCorrect: boolean;
    imageUrl: string;
}

export interface CurrentQuestion {
    questionId: number;
    title: string;
    answers: Answers[];
    imageUrl?: string;
}

export type Question = Required<CurrentQuestion>;

export interface ScoreObj {
    id: number;
    player: string;
    score: number;
    date: string;
};

export interface HighScoreProps {
    score: ScoreObj
    index: number;
}

export interface QuizDataState {
    title: string;
    scores: ScoreObj[]
}

