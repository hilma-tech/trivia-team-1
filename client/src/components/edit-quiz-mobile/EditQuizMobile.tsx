import React, { Component, FC, useState, createContext, useEffect } from 'react';
// import '../css/EditQuiz.scss'

import ShowQuizBtn from '../../images/showquizzbtn.svg'
import LinkBtn from '../../images/linkBtn.svg'
import saveBtn from '../../images/saveBtn.svg'
import Selectimage from '../../images/image.svg'
import AddQuestionBox from '../AddQuestionBox';
import plusBtn from '../../images/plusBtn.svg'
import FinalBoxQuestions from '../FinalBoxQuestions';
import { useAnswerContext } from '../../context/AnswersContext'
import { CurrentQuestion } from '../../utils/Interfaces'

import '../../style/EditQuiz.scss'






const EditQuizMobile: FC = () => {
    const { sendInput, setQuestions, questions, setSendInput, setEmptyQuestionEdit, emptyQuestionEdit } = useAnswerContext()

    // const [questionsArr, setQuestionsArr] = useState([1]);
    const [currentEditQuestion, setCurrentEditQuestion] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState<CurrentQuestion>({
        questionId: 1,
        questionTitle: '',
        answers: ['', '']
    });

    const [countForKeys, setCountForKeys] = useState(0);



    useEffect(() => {
        setQuestions([...questions, currentQuestion])
    }, [sendInput])


    const addQuestion = () => {
        // setEmptyQuestionEdit(!emptyQuestionEdit)
        setSendInput(!sendInput)
        if (questions.length < 10) {
            // setCurrentQuestion(prevState => ({
            //     ...prevState,
            //     questionId: prevState.questionId + 1
            //   }));
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
            <div className='formContanier active'>
                <div className='topContainer'>
                    <div className='topButtonsContainer'>
                        <div className='topRightbtn'>
                            <button className='showQuizBtn'>
                                צפייה בחידון
                                <img className='ShowQuizSvg' src={ShowQuizBtn} />
                            </button>
                        </div>
                        <div className='topLeftBtn'>
                            <button className='saveBtn'>
                                שמירה
                                <img className='saveBtnSvg' src={saveBtn} />
                            </button>
                            <button className='linkbtn'><img className='linkBtnSvg' src={LinkBtn} /></button>
                        </div>
                    </div>
                </div>

                <div className='quizHeaderContainer hide' >
                    <div className='quizHeaderImage'> <img className='selectImageQuizSvg' src={Selectimage} /></div>
                    <div className='titleHeaderContainer'>
                        <h1>חידון ללא כותרת</h1>
                        <p>תיאור חידון</p>
                    </div>
                </div>
                {questions.map((item, index: number) => {
                    return (
                        currentEditQuestion === index
                            ? <AddQuestionBox key={index} setCurrentQuestion={setCurrentQuestion} currentQuestion={currentQuestion} />
                            : <FinalBoxQuestions key={index} questionId={index + 1} />
                    )
                })}
                {/* <AddQutionsBox /> */}
                <div className='plus-btn-container'>
                    <button className='plus-btn' onClick={addQuestion}>
                        <img src={plusBtn} className='plus-btn-svg' />
                    </button>
                </div>
            </div>
        </>
    );
}

export default EditQuizMobile;