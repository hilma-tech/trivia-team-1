import React, { FC } from 'react';
import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import dragAndDropSvg from '../images/drag-and-drop.svg'
import { CurrentQuestion, Question } from '../utils/Interfaces';
import { useQuestionContext } from '../context/AnswersContext';
import { Typography } from '@mui/material';



interface FinalBoxQuestionsProps {
    question: Question;
    index:number;
    setCurrentEditQuestion:React.Dispatch<React.SetStateAction<number>>;
}




const FinalQuestionBox: FC<FinalBoxQuestionsProps> = ({ question , index  , setCurrentEditQuestion}) => {


    const openEditMode = (index: number) => {
        setCurrentEditQuestion(index);
    }


    return (
        <div className='ready-questions-container' onClick={() => openEditMode(index)}>
            <div className='darg-and-drop-container'>
                    <img className='drag-and-drop-svg' src={dragAndDropSvg} alt=' drag and drop Svg' />
            </div>
            <div className='answer-and-questions-container'>
                <div className='question-container'>
                    <p className='question-title-final-box'>{question.questionTitle}</p>
                </div>
                <div className="answer-container">
                    <FormControl>
                        <RadioGroup>
                            <div className="radio-ready-container" dir='rtl'>
                                {question.answers.map((answer, index) =>
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




