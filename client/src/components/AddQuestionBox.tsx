import React, { FC, useState, useEffect, Ref, ForwardedRef } from "react";
import Selectimage from '../images/image.svg'
import NewAnswer from './NewAnswer'
import AddAnswer from '../images/addAnswer.svg'
import duplicateSvg from '../images/copy.svg'
import TrashSvg from '../images/trash.svg'
import dragAndDropSvg from '../images/drag-and-drop.svg'
import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';
import { CurrentQuestion } from '../utils/Interfaces'
import AnswersProvider from "../context/AnswersContext";



interface AddQuestionBoxProps {
    setCurrentQuestion: React.Dispatch<React.SetStateAction<CurrentQuestion>>;
    currentQuestion: CurrentQuestion;


}


const AddQuestionBox: FC<AddQuestionBoxProps> = ({ setCurrentQuestion, currentQuestion }) => {



    const addAnswer = () => {
        if (currentQuestion.answers.length < 4) {
            setCurrentQuestion(prevState => ({
                ...prevState,
                answers: [...prevState.answers, '']
            }));
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setCurrentQuestion((prev) => {
            return { ...prev, questionTitle: e.target.value }
        });

    }


    return (
        <div className='add-Questions-Container'>
            <div className='darg-and-drop-Container'>
                    <img className='drag-and-drop-Svg' src={dragAndDropSvg} alt=' drag and drop Svg' />
            </div>

            <div className='quiz-Questions-Container'>
                <div className='quiz-Questions' >
                    <input type="text" placeholder="שאלה" className="question-input" value={currentQuestion.questionTitle} onChange={handleChange} />
                    <img className='select-Image-Questions-Svg' src={Selectimage} alt=' select Image Questions Svg' />
                </div>
                <div className="answer-container">
                    <FormControl>
                        <RadioGroup
                            name="radio-buttons-group"
                        >

                            {currentQuestion.answers.map((answer, index) => (
                                <NewAnswer key={index} answerIndex={index} setCurrentQuestion={setCurrentQuestion} currentQuestion={currentQuestion} />
                            ))}
                        </RadioGroup>
                    </FormControl>

                </div>
                <div className="add-answer-container">
                    <button onClick={addAnswer} className="add-answer-btn">
                        <img src={AddAnswer} className="add-answer-svg" alt='add answer svg' /> הוספת תשובה
                    </button>
                </div>
                <div className="hr-line"></div>
                <div className="footer-container-questions-btn">
                    <button className="duplicate-btn">
                        <img src={duplicateSvg} className="duplicate-svg" alt='duplicate svg' />
                    </button>
                    <button className="trash-btn">
                        <img src={TrashSvg} className="trash-svg" alt='trash svg' />
                    </button>
                </div>
            </div>
        </div>
    )
};


export default AddQuestionBox;