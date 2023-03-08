import React, { Component, FC, useState, createContext, useContext, useEffect } from 'react';
import { useQuestionContext } from '../../context/AnswersContext'
import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import { Typography } from '@mui/material';



interface Props {
    questionId: number;


}


const FinalBoxQuestions: FC<Props> = ({ questionId }) => {
    const { setQuestions, questions } = useQuestionContext()


    useEffect(() => {
        console.log('questions:', questions)
    }, [questions])

    return (
        <div className='readyQuestionsContanier'>

            {questions.length > 1 &&
                questions.map((question, index: number) =>
                    index != 0 && index === questionId &&
                    <div className='answer-and-qeustions-container'>
                        <div className='question-contanier'>
                            <p>{question.title}</p>
                        </div>
                        <div className="answer-container">
                            <FormControl>
                                <RadioGroup>
                                    <div className="radio-ready-Contanier" dir='rtl'>
                                        {question.answers.map((answer, index: number) =>
                                            <FormControlLabel key={index} value={`answer${index + 1}`} control={<Radio />} label={<Typography sx={{fontSize: '18px'}}>{answer.text}</Typography>} checked={answer.isCorrect} />
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

export default FinalBoxQuestions