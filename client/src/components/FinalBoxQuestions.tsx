import React, { FC } from 'react';
import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import { CurrentQuestion } from '../utils/Interfaces';



interface Props {
    question: CurrentQuestion;
}


const FinalBoxQuestions: FC<Props> = ({ question }) => {

    return (
        <div className='readyQuestionsContanier'>
            <div className='answer-and-qeustions-container' >
                <div className='question-contanier'>
                    <p>{question.questionTitle}</p>
                </div>
                <div className="answer-container">
                    <FormControl>
                        <RadioGroup>
                            <div className="radio-ready-Contanier" dir='rtl'>
                                {question.answers.map((answer, index: number) =>
                                    <FormControlLabel key={index} value={`answer${index + 1}`} control={<Radio />} label={answer} checked={question.correctAnswer === index + 1} />
                                )}
                            </div>
                        </RadioGroup>
                    </FormControl>
                </div>
            </div>
        </div>
    )

}

export default FinalBoxQuestions