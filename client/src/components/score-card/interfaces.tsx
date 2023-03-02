export interface ScoreObj {
    id: number;
    player: string;
    score: number;
    date: string;
};
export interface PropsObj {
    score: ScoreObj
    index: number;
}
export interface ScoreState {
    title: string;
    scores: ScoreObj[]
}