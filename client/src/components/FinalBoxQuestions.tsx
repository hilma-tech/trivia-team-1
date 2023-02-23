import React, { Component, FC, useState, createContext, useContext, useEffect } from 'react';
import { useAnswerContext } from '../context/AnswersContext'
import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';


interface Props {
    questionId: number;
    

}


const FinalBoxQuestions: FC<Props> = ({questionId}) => {
    const { sendInput, setCurrentAnswers, currentAnswers } = useAnswerContext()
    // const [questionId, setQuestionId] = useState(1);



    useEffect(() => {
        console.log('currentAnswers:', currentAnswers)
    }, [currentAnswers])

    return (
        <div className='readyQuestionsContanier'>

            {currentAnswers.length > 1 &&
                currentAnswers.map((answer, index: number) =>
                    index != 0 && index === questionId &&
                    <div className='answer-and-qeustions-container'>
                        <div className='question-contanier'>
                            <p>{answer.question}</p>
                        </div>
                        <div className="answer-container">
                            <FormControl>
                                <RadioGroup>
                                    <div className="radio-ready-Contanier" dir='rtl'>
                                        <FormControlLabel value={'answer1'} control={<Radio />} label={answer.answer1} />
                                        <FormControlLabel value={'answer2'} control={<Radio />} label={answer.answer2} />
                                        <FormControlLabel value={'answer3'} control={<Radio />} label={answer.answer3} />
                                        <FormControlLabel value={'answer4'} control={<Radio />} label={answer.answer4} />
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