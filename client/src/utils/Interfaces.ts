import { FilesUploader } from "@hilma/fileshandler-client";

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
    questionIndex?:number;
    link:string , 
    id:number;
}

export interface MobileInputType{
    currentQuestion: CurrentQuestion;
    answerIndex: number;
    uploadedImageUrl: string;
    filesUploader: FilesUploader;
    handleImageFile: (value: imageFile) => void;
    deleteAnswer: (e: any) => void;
    handleCorrectAnswer :() => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    setUploadedImageUrl: React.Dispatch<React.SetStateAction<string>>
}


export type Question = Required<CurrentQuestion>;



