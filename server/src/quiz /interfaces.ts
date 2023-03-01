export interface ScoreObj {
    id: number;
    score: number;
    player: string;
    date: Date;
    // quiz: number;
}
export interface Scores {
    title: string;
    scores: ScoreObj[];
}