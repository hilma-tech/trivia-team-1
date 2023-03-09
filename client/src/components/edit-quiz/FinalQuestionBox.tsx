import React, { FC } from 'react';
import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import dragAndDropSvg from '../../images/drag-and-drop.svg'
import { CurrentQuestion, Question } from '../../utils/Interfaces';
import { useQuestionContext } from '../../context/AnswersContext';
import { Typography } from '@mui/material';
import useImageFileUpload from '../../context/imageFilesZus';
import { isFull } from './EditQuiz';



interface FinalBoxQuestionsProps {
    question: Question;
    index: number;
    setCurrentEditQuestion: React.Dispatch<React.SetStateAction<number>>;
    currentEditQuestion: number
}




const FinalQuestionBox: FC<FinalBoxQuestionsProps> = ({ question, index, setCurrentEditQuestion, currentEditQuestion }) => {

    const questionsImagesArr = useImageFileUpload(state => state.questionImagesObject)


    const { questions } = useQuestionContext()

    const openEditMode = (index: number) => {
        if (isFull(questions[currentEditQuestion])) {
            setCurrentEditQuestion(index);
        } else {
            alert("please finish edit that question");
        }
        //     //TODO: else:
        //     //TODO: alert user to finish editing the question
    }


    return (
        <div className='ready-questions-container' onClick={() => openEditMode(index)}>
            <div className='darg-and-drop-container'>
                <img className='drag-and-drop-svg' src={dragAndDropSvg} alt=' drag and drop icon' />
            </div>
            <div className='answer-and-questions-container'>
                <div className='question-container'>
                    <p className='question-title-final-box'>{question.title}</p>
                    {question.hasOwnProperty("imageUrl") &&
                        <img className='question-image-final-box' src={question.imageUrl} alt='question' />
                    }
                </div>
                <div className="answer-container">
                    <FormControl>
                        <RadioGroup>
                            <div className="radio-ready-container" dir='rtl'>
                                {question.answers.map((answer, index) =>
                                    <div className='final-box-answer-and-image-container'>
                                        <FormControlLabel key={index} value={`answer${index + 1}`} control={<Radio />} label={<Typography sx={{ fontSize: 18 }}>{answer.text}</Typography>} checked={answer.isCorrect} />
                                        {answer.imageUrl !== '' &&
                                            <img className='answer-image' src={answer.imageUrl} alt='show the image yu upload' />
                                        }
                                    </div>
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




