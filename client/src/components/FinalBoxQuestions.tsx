import React, { Component, FC, useState, createContext, useContext, useEffect } from 'react';
import { useAnswerContext } from '../context/AnswersContext'
import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';


interface Props {
    questionId: number;


}


const FinalBoxQuestions: FC<Props> = ({ questionId }) => {
    const { sendInput, setCurrentAnswers, questions: questions } = useAnswerContext()
    // const [questionId, setQuestionId] = useState(1);



    useEffect(() => {
        console.log('currentAnswers:', questions)
    }, [questions])

    return (
        <div className='readyQuestionsContanier'>

            {questions.length > 1 &&
                questions.map((question, index: number) =>
                    index != 0 && index === questionId &&
                    <div className='answer-and-qeustions-container'>
                        <div className='question-contanier'>
                            <p>{question.questionTitle}</p>
                        </div>
                        <div className="answer-container">
                            <FormControl>
                                <RadioGroup>
                                    <div className="radio-ready-Contanier" dir='rtl'>
                                        {question.answers.map((answer, index: number) =>
                                            <FormControlLabel key={index} value={'answer2'} control={<Radio />} label={answer} />
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