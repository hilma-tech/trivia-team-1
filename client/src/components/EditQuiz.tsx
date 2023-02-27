import React, { Component, FC, useState, createContext, useEffect } from 'react';
import '../css/EditQuiz.scss'
import LeftLeaf from '../images/leftleaf.svg'
import RightLeaf from '../images/rightleaf.svg'
import ShowQuizBtn from '../images/showquizzbtn.svg'
import LinkBtn from '../images/linkBtn.svg'
import saveBtn from '../images/saveBtn.svg'
import Selectimage from '../images/image.svg'
import AddQuestionBox from './AddQuestionBox'
import plusBtn from '../images/plusBtn.svg'
import FinalQuestionBox from './FinalQuestionBox'
import { useAnswerContext } from '../context/AnswersContext'
import { CurrentQuestion } from '../utils/Interfaces'

import AnswersProvider from '../context/AnswersContext'






const EditQuiz: FC = () => {

    const {  setQuestions, questions, setEmptyQuestionEdit, emptyQuestionEdit } = useAnswerContext()

    const [currentEditQuestion, setCurrentEditQuestion] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState<CurrentQuestion>({
        questionId: 1,
        questionTitle: '',
        answers: ['', '']
    });


    useEffect(() => {
        setQuestions([...questions, currentQuestion])
    }, [])


    const addQuestion = () => {
        setEmptyQuestionEdit(!emptyQuestionEdit)
        if (questions.length < 10) {
            setQuestions([...questions, currentQuestion])
            setCurrentEditQuestion(currentEditQuestion + 1)
            setCurrentQuestion(prevState => ({
                ...prevState,
                questionId: prevState.questionId + 1,
                questionTitle: '',
                answers: ['', '']

            }));


        }

    }


    return (
        <>
            <div className='leftleafContainer'>
                <img className='leftleaf' src={LeftLeaf} alt="left leaf" />
                <img className='rightleaf' src={RightLeaf} alt="right leaf" />
            </div>
            <div className='form-Container'>
                <div className='top-Container'>
                    <div className='top-Buttons-Container'>
                        <div className='top-Right-btn'>
                            <button className='show-Quiz-Btn'>
                                צפייה בחידון
                                <img className='Show-Quiz-Svg' src={ShowQuizBtn} alt='show quiz svg' />
                            </button>
                        </div>
                        <div className='topLeftBtn'>
                            <button className='save-Btn'>
                                שמירה
                                <img className='save-Btn-Svg' src={saveBtn} />
                            </button>
                            <button className='link-btn'><img className='link-Btn-Svg' src={LinkBtn} /></button>
                        </div>
                    </div>
                </div>
                <div className='quiz-Header-Container'>
                    <div className='quiz-Header-Image'> <img className='select-Image-Quiz-Svg' src={Selectimage} /></div>
                    <div className='title-Header-Container'>
                        <h1>חידון ללא כותרת</h1>
                        <p>תיאור חידון</p>
                    </div>
                </div>
                {questions.map((item, index: number) => {
                    return (
                        currentEditQuestion === index
                            ? <AddQuestionBox key={index} setCurrentQuestion={setCurrentQuestion} currentQuestion={currentQuestion} />
                            : <FinalQuestionBox key={index} questionId={index + 1} />
                    )
                })}
                <div className='plus-btn-container'>
                    <button className='plus-btn' onClick={addQuestion}>
                        <img src={plusBtn} className='plus-btn-svg' alt='plus button svg' />
                    </button>
                </div>
            </div>
        </>
    );
}

export default EditQuiz;