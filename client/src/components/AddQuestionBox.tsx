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
import QuestionsProvider from "../context/AnswersContext";
import BootstrapTooltip from "../tooltip/tooltip";



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
        <div className='add-questions-container'>
            <div className='darg-and-drop-container'>
                <BootstrapTooltip title="שינוי סדר השאלות">
                    <img className='drag-and-drop-svg' src={dragAndDropSvg} alt='drag button to switch question place' />
                </BootstrapTooltip>
            </div>

            <div className='quiz-questions-container'>
                <div className='quiz-questions' >
                    <BootstrapTooltip title="שינוי שם">
                        <input type="text" placeholder="שאלה" className="question-input" value={currentQuestion.questionTitle} onChange={handleChange} />
                    </BootstrapTooltip>
                    <BootstrapTooltip title="הוספת תמונה לשאלה">
                        <img className='select-image-questions-svg' src={Selectimage} alt='add image here to the question' />
                    </BootstrapTooltip>

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
                        <img src={AddAnswer} className="add-answer-svg" alt='add answer to your question' /> הוספת תשובה
                    </button>
                </div>
                <div className="hr-line"></div>
                <div className="footer-container-questions-btn">

                    <BootstrapTooltip title="שכפול">
                        <button className="duplicate-btn">
                            <img src={duplicateSvg} className="duplicate-svg" alt='duplicate your question' />
                        </button>
                    </BootstrapTooltip>
                    <BootstrapTooltip title="מחיקה">
                        <button className="trash-btn">
                            <img src={TrashSvg} className="trash-svg" alt='delete your question' />
                        </button>
                    </BootstrapTooltip>
                </div>
            </div>
        </div>
    )
};


export default AddQuestionBox;