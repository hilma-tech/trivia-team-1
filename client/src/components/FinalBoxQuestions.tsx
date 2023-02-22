import React, { Component, FC, useState, createContext, useContext, useEffect } from 'react';
import { useAnswerContext } from '../context/AnswersContext'



// type answer ={
//     answer1: string ;

// }


const FinalBoxQuestions: FC = () => {
    const { sendInput, setCurrentAnswers, currentAnswers } = useAnswerContext()
    const [questionId, setQuestionId] = useState(1);



    // useEffect(() => {
    //     console.log('currentAnswers:', currentAnswers)
    // }, [currentAnswers])

    return (
        <div className='redayQuestionsContanier'>
            {currentAnswers.length > 1 &&
                currentAnswers.map((answer, index: number) =>
                    index != 0 &&
                    <div>
                        <p>{answer.answer1}</p>
                        <p>{answer.answer2}</p>
                        <p>{answer.answer3}</p>
                        <p>{answer.answer4}</p>
                    </div>
                )}

        </div>
    )

}

export default FinalBoxQuestions