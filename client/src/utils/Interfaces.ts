import { FilesUploader , UploadedFile } from "@hilma/fileshandler-client";

export interface imageFile{
    id:number;
    link: string;
}

export interface Answer {
    text: string;
    isCorrect: boolean;
    imageUrl?: imageFile;
}


export interface CurrentQuestion {
    id: number;
    title: string;
    answers: Answer[];
    imageUrl?: imageFile ;
}

export interface ImageFile {
    questionIndex?: number;
    link: string,
    id: number;
}

export interface MobileInputType {
    currentQuestion: CurrentQuestion;
    setCurrentQuestion : React.Dispatch<React.SetStateAction<CurrentQuestion>>;
    answerIndex: number;
    filesUploader: FilesUploader;
    handleImageFile: (value: UploadedFile) => void;
    deleteAnswer: (e: any) => void;
    handleCorrectAnswer: () => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export enum PhonePage {
    firstPage = 1,
    secondPage = 2,
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


