import React, { Component, FC, useState, createContext, useContext, useEffect } from 'react';
import { useAnswerContext } from '../context/AnswersContext'
import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';



interface FinalBoxQuestionsProps {
    questionId: number;


}


const FinalQuestionBox: FC<FinalBoxQuestionsProps> = ({ questionId }) => {
    const {  setQuestions, questions} = useAnswerContext()


    useEffect(() => {
        console.log('questions:', questions)
    }, [questions])

    return (
        <div className='ready-Questions-Container'>

            {questions.length > 1 &&
                questions.map((question, index: number) =>
                    index != 0 && index === questionId &&
                    <div className='answer-and-questions-container'>
                        <div className='question-container'>
                            <p>{question.questionTitle}</p>
                        </div>
                        <div className="answer-container">
                            <FormControl>
                                <RadioGroup>
                                    <div className="radio-ready-container" dir='rtl'>
                                        {question.answers.map((answer, index: number) =>
                                            <FormControlLabel key={index} value={`answer${index+1}`} control={<Radio />} label={answer}  checked={question.correctAnswer === index+1} />
                                        )}
                                    </div>
                                </RadioGroup>
                            </FormControl>
                        </div>
                    </div>
                )}

        </div>
    )

}

export default FinalQuestionBox