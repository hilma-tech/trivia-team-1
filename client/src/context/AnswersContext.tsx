import React, { useState, createContext, FC, ReactNode, useContext } from "react";
import {CurrentQuestion, Question} from '../utils/Interfaces'

interface AnswersContextInterface {
    setQuestions: React.Dispatch<React.SetStateAction<CurrentQuestion[]>>;
    questions:Question[];
    emptyQuestionEdit : boolean;
    setEmptyQuestionEdit : React.Dispatch<React.SetStateAction<boolean>>;

}

interface AnswersProviderProps {
    children: ReactNode;
}

export const AnswersContext = createContext<AnswersContextInterface | null>(null);


const AnswersProvider: FC<AnswersProviderProps> = ({ children }) => {

    const [questions, setQuestions] = useState<any[]>([]);
    const [emptyQuestionEdit, setEmptyQuestionEdit] = useState(true);


    const contextValue: AnswersContextInterface = {
        setQuestions: setQuestions,
        questions: questions,
        emptyQuestionEdit :emptyQuestionEdit,
        setEmptyQuestionEdit: setEmptyQuestionEdit
    }

    return (
        <AnswersContext.Provider value={contextValue}>
            {children}
        </AnswersContext.Provider>
    )
}

export const useAnswerContext = () => useContext(AnswersContext)!
export default AnswersProvider;