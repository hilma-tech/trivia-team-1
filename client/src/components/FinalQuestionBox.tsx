import React, { FC } from 'react';
import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import { CurrentQuestion, Question } from '../utils/Interfaces';
import { useAnswerContext } from '../context/AnswersContext';



interface FinalBoxQuestionsProps {
    question: Question;
}


const FinalQuestionBox: FC<FinalBoxQuestionsProps> = ({ question }) => {
    return (
        <div className='ready-Questions-Container'>
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
        </div>
    )

}

export default FinalQuestionBox