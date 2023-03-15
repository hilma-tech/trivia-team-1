import React, { useState, createContext, FC, ReactNode, useContext, useEffect } from "react";
import { CurrentQuestion } from '../utils/Interfaces'
import { FileInput, FilesUploader, UploadedFile, useFiles } from '@hilma/fileshandler-client';
import { useLocation } from "react-router";


interface AnswersContextInterface {
    setQuestions: React.Dispatch<React.SetStateAction<CurrentQuestion[]>>;
    questions: CurrentQuestion[];
    filesUploader: FilesUploader;
}

interface AnswersProviderProps {
    children: ReactNode;
}

export const QuestionsContext = createContext<AnswersContextInterface | null>(null);


const QuestionsProvider: FC<AnswersProviderProps> = ({ children }) => {
    const { pathname } = useLocation();

    const [questions, setQuestions] = useState<CurrentQuestion[]>([
        { id: 0, title: "", imageUrl: { id: -1, link: '' }, answers: [{ text: '', isCorrect: false, imageUrl: { id: -1, link: '' } }, { text: '', isCorrect: false, imageUrl: { id: -1, link: '' } }] }
    ]);

    const filesUploader = useFiles();

    useEffect(() => {
        filesUploader.deleteAll();
    }, [pathname]);

    const contextValue: AnswersContextInterface = {
        setQuestions: setQuestions,
        questions: questions,
        filesUploader: filesUploader
    }

    return (
        <QuestionsContext.Provider value={contextValue}>
            {children}
        </QuestionsContext.Provider>
    )
}

export const useQuestionContext = () => {
    const result = useContext(QuestionsContext);
    if (!result) throw new Error("You forgot to put the QuestionsProvider!");
    return result;
}
export default QuestionsProvider;