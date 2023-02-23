import React, { useState, createContext, useEffect, FC, ReactNode, useContext } from "react";
import {CurrentQuestion, Question} from '../utils/Interfaces'
interface AnswersContextInterface {
    setQuestions: React.Dispatch<React.SetStateAction<CurrentQuestion[]>>;
    sendInput: boolean;
    questions:Question[];
    setSendInput: React.Dispatch<React.SetStateAction<boolean>>;
    emptyQuestionEdit : boolean;
    setEmptyQuestionEdit : React.Dispatch<React.SetStateAction<boolean>>;

}

interface AnswersProviderProps {
    children: ReactNode;
}

export const AnswersContext = createContext<AnswersContextInterface | null>(null);


const AnswersProvider: FC<AnswersProviderProps> = ({ children }) => {

    const [sendInput, setSendInput] = useState(false);
    const [questions, setQuestions] = useState<any[]>([]);
    const [emptyQuestionEdit, setEmptyQuestionEdit] = useState(true);

    // useEffect(() => {
    //     console.log(currentAnswers.length)
    // },[currentAnswers.length])

    // useEffect(() => {
    //     console.log("currentAnswers:", currentAnswers);
    // }, [sendInput])

    const contextValue: AnswersContextInterface = {
        setSendInput: setSendInput,
        sendInput: sendInput,
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