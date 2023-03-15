import React, { useState, createContext, FC, ReactNode, useContext } from "react";
import { CurrentQuestion } from '../utils/Interfaces'

interface AnswersContextInterface {
    setQuestions: React.Dispatch<React.SetStateAction<CurrentQuestion[]>>;
    questions: CurrentQuestion[];
}

interface AnswersProviderProps {
    children: ReactNode;
}

export const QuestionsContext = createContext<AnswersContextInterface | null>(null);


const QuestionsProvider: FC<AnswersProviderProps> = ({ children }) => {

    const [questions, setQuestions] = useState<CurrentQuestion[]>([
        { questionId: 0, title: "", imageUrl: '', answers: [{ text: '', isCorrect: false, imageUrl: '' }, { text: '', isCorrect: false, imageUrl: '' }] }
    ]);

    const contextValue: AnswersContextInterface = {
        setQuestions: setQuestions,
        questions: questions
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