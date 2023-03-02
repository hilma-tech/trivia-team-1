import React, { FC } from 'react';
import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import dragAndDropSvg from '../images/drag-and-drop.svg'
import { CurrentQuestion, Question } from '../utils/Interfaces';
<<<<<<< HEAD
import { useAnswerContext } from '../context/AnswersContext';
=======
import { useQuestionContext } from '../context/AnswersContext';
>>>>>>> 47fd2e3757f5f62cc619acdd7d42dc7b500703a5
import { Typography } from '@mui/material';



interface FinalBoxQuestionsProps {
    question: Question;
}


const FinalQuestionBox: FC<FinalBoxQuestionsProps> = ({ question }) => {
    return (
<<<<<<< HEAD
        <div className='ready-Questions-Container'>
            <div className='darg-and-drop-Container'>
                    <img className='drag-and-drop-Svg' src={dragAndDropSvg} alt=' drag and drop Svg' />
=======
        <div className='ready-questions-container'>
            <div className='darg-and-drop-container'>
                    <img className='drag-and-drop-svg' src={dragAndDropSvg} alt=' drag and drop Svg' />
>>>>>>> 47fd2e3757f5f62cc619acdd7d42dc7b500703a5
            </div>
            <div className='answer-and-questions-container'>
                <div className='question-container'>
                    <p className='question-title-final-box'>{question.questionTitle}</p>
                </div>
                <div className="answer-container">
                    <FormControl>
                        <RadioGroup>
                            <div className="radio-ready-container" dir='rtl'>
<<<<<<< HEAD
                                {question.answers.map((answer, index: number) =>
=======
                                {question.answers.map((answer, index) =>
>>>>>>> 47fd2e3757f5f62cc619acdd7d42dc7b500703a5
                                    <FormControlLabel  key={index} value={`answer${index+1}`} control={<Radio />} label={<Typography sx={{ fontSize: 18 }}>{answer}</Typography>}  checked={question.correctAnswer === index+1} />
                                )}
                            </div>
                        </RadioGroup>
                    </FormControl>
                </div>
            </div>
            <div className='empty-div'></div>
        </div>
    )

}

export default FinalQuestionBox