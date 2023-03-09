export interface CurrentQuestion {
    questionId: number;
    questionTitle: string;
    answers: string[];
    correctAnswer?: number;
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

