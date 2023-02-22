import React, { Component, FC, useState, createContext, useEffect } from 'react';
import '../css/EditQuiz.scss'
import LeftLeaf from '../images/leftleaf.svg'
import RightLeaf from '../images/rightleaf.svg'
import ShowQuizBtn from '../images/showquizzbtn.svg'
import LinkBtn from '../images/linkBtn.svg'
import saveBtn from '../images/saveBtn.svg'
import Selectimage from '../images/image.svg'
import AddQutionsBox from './addQuestionsBox'
import plusBtn from '../images/plusBtn.svg'
import FinalBoxQuestions from './FinalBoxQuestions'
import { useAnswerContext } from '../context/AnswersContext'
import { Answers } from '../utils/Interfaces'

import AnswersProvider from '../context/AnswersContext'




// interface AnswersContextInterface {
//     setCurrentAnswers: React.Dispatch<React.SetStateAction<string[]>>;
//     sendInput: boolean;
//     currentAnswers: string[]z;
// }



// export const AnswersContext = createContext<AnswersContextInterface | null>(null);



const EditQuiz: FC = () => {

    const { sendInput, setCurrentAnswers, currentAnswers, setSendInput  , setEmptyQuestionEdit , emptyQuestionEdit} = useAnswerContext()

    const [questionsArr, setQuestionsArr] = useState([1]);
    const [currentEditQuestion, setCurrentEditQuestion] = useState(0);
    const [answer, setAnswer] = useState<Answers>({ answer1: '', answer2: '', answer3: '', answer4: '' });

    const [countForKeys, setCountForKeys] = useState(0);



    useEffect(() => {
        setCurrentAnswers([...currentAnswers, answer])
    }, [sendInput])


    const addQuestion = () => {
        setEmptyQuestionEdit(!emptyQuestionEdit)
        setSendInput(!sendInput)
        if (questionsArr.length < 10) {
            setQuestionsArr([...questionsArr, 1]);
            setCurrentEditQuestion(currentEditQuestion + 1)

        }


    }



    return (
        <>
            <div className='leftleafContainer'>
                <img className='leftleaf' src={LeftLeaf} alt="left leaf" />
                <img className='rightleaf' src={RightLeaf} alt="right leaf" />
            </div>
            <div className='formContanier'>
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
                <div className='quizHeaderContainer'>
                    <div className='quizHeaderImage'> <img className='selectImageQuizSvg' src={Selectimage} /></div>
                    <div className='titleHeaderContainer'>
                        <h1>חידון ללא כותרת</h1>
                        <p>תיאור חידון</p>
                    </div>
                </div>
                {questionsArr.map((item, index: number) => {
                    return (
                        currentEditQuestion === index
                            ? <AddQutionsBox key={index} setAnswer={setAnswer} answer={answer} />
                            : <FinalBoxQuestions key={index} />
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

export default EditQuiz;