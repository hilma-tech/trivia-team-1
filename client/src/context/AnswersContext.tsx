import React, { useState, createContext, FC, ReactNode, useContext } from "react";
import {CurrentQuestion, Question} from '../utils/Interfaces'

interface AnswersContextInterface {
    setQuestions: React.Dispatch<React.SetStateAction<CurrentQuestion[]>>;
    questions: CurrentQuestion[];
}

interface AnswersProviderProps {
    children: ReactNode;
}

export const AnswersContext = createContext<AnswersContextInterface | null>(null);


const AnswersProvider: FC<AnswersProviderProps> = ({ children }) => {

    const [questions, setQuestions] = useState<CurrentQuestion[]>([
        {questionId: 0, questionTitle: "", answers: ["", ""]}
    ]);

    const contextValue: AnswersContextInterface = {
        setQuestions: setQuestions,
        questions: questions
    }

    return (
        <AnswersContext.Provider value={contextValue}>
            {children}
        </AnswersContext.Provider>
    )
}

export const useAnswerContext = () => useContext(AnswersContext)!
export default AnswersProvider;