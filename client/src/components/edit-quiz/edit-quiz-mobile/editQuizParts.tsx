import { FC } from "react";
import React, { useState, useEffect } from "react";
import Selectimage from '../../../images/image.svg'
import duplicateSvg from '../../../images/copy.svg'
import TrashSvg from '../../../images/trash.svg'
import { CurrentQuestion } from "../utils/Interfaces";

interface Props {
    currentQuestion: CurrentQuestion;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    questionId: number;
}

export const MobileHeader: FC<Props> = ({handleChange, currentQuestion, questionId}) => (
    <div>
        <div className="phone-header-container">
            <h3>שאלה {questionId}</h3>
            <div className="copy-trash-imgs">
                <img className="icon" src={duplicateSvg} />
                <img className="icon" src={TrashSvg} />
            </div>
        </div>


        <div className="header-input-container">
            <h6 id="input-header">כותרת</h6>
            <div className='quizQuestions' >
                <input type="text" placeholder="שאלה" className="question-input" value={currentQuestion.questionTitle} onChange={handleChange} />
                <img className='selectImageQutionsSvg' src={Selectimage} />
            </div>
        </div>
    </div>
)