import React, { useState, createContext, useEffect, FC, ReactNode, useContext } from "react";
import {Answers} from '../utils/Interfaces'
interface AnswersContextInterface {
    setCurrentAnswers: React.Dispatch<React.SetStateAction<Answers[]>>;
    sendInput: boolean;
    currentAnswers: Answers[];
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
    const [currentAnswers, setCurrentAnswers] = useState<any[]>([]);
    const [emptyQuestionEdit, setEmptyQuestionEdit] = useState(true);



    // useEffect(() => {
    //     console.log("currentAnswers:", currentAnswers);
    // }, [sendInput])

    const contextValue: AnswersContextInterface = {
        setSendInput: setSendInput,
        sendInput: sendInput,
        setCurrentAnswers: setCurrentAnswers,
        currentAnswers: currentAnswers,
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