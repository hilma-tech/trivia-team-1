import { FilesUploader } from "@hilma/fileshandler-client";

export interface Answers {
    text: string;
    isCorrect: boolean;
    imageUrl: string;
}



export interface CurrentQuestion {
    id: number;
    title: string;
    answers: Answers[];
    imageUrl?: string;
}

export interface ImageFile {
    questionIndex?: number;
    link: string,
    id: number;
}

export interface MobileInputType {
    currentQuestion: CurrentQuestion;
    answerIndex: number;
    uploadedImageUrl: string;
    filesUploader: FilesUploader;
    handleImageFile: (value: ImageFile) => void;
    deleteAnswer: (e: any) => void;
    handleCorrectAnswer: () => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    setUploadedImageUrl: React.Dispatch<React.SetStateAction<string>>
}

export enum PhonePage {
    firstPage = 1,
    secondPage = 2,
}


export type Question = Required<CurrentQuestion>;



