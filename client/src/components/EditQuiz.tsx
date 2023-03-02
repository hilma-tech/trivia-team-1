<<<<<<< HEAD
import React, { Component, FC, useState, createContext, useEffect } from 'react';
=======
import React, { FC, useState } from 'react';
>>>>>>> 47fd2e3757f5f62cc619acdd7d42dc7b500703a5
import '../style/EditQuiz.scss'
import ShowQuizBtn from '../images/showquizzbtn.svg'
import LinkBtn from '../images/linkBtn.svg'
import saveBtn from '../images/saveBtn.svg'
import Selectimage from '../images/image.svg'
import AddQuestionBox from './AddQuestionBox'
import plusBtn from '../images/plusBtn.svg'
import FinalQuestionBox from './FinalQuestionBox'
<<<<<<< HEAD
import { useAnswerContext } from '../context/AnswersContext'
import { CurrentQuestion, Question } from '../utils/Interfaces'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { TextField } from '@mui/material';
=======
import { useQuestionContext } from '../context/AnswersContext'
import { CurrentQuestion, Question } from '../utils/Interfaces'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { createTheme, TextField } from '@mui/material';
import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import BootstrapTooltip from '../tooltip/tooltip'



const theme = createTheme({
    direction: 'rtl',
});


const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [rtlPlugin],
});
>>>>>>> 47fd2e3757f5f62cc619acdd7d42dc7b500703a5



const EditQuiz: FC = () => {

<<<<<<< HEAD
    const { setQuestions, questions } = useAnswerContext()
    const [currentEditQuestion, setCurrentEditQuestion] = useState(0);
    const [questionDetails, setQuestionDetails] = useState({ quizName: '', quizDescription: '', QuizImageUrl: '' })
    console.log(questionDetails)

=======
    const { setQuestions, questions } = useQuestionContext()
    console.log('questions: ', questions);
    const [currentEditQuestion, setCurrentEditQuestion] = useState(0);
    // const [currentQuestionId, setCurrentQuestionId] = useState(1);
    console.log('currentEditQuestion: ', currentEditQuestion);
    const [questionDetails, setQuestionDetails] = useState({ quizName: '', quizDescription: '', QuizImageUrl: '' })
>>>>>>> 47fd2e3757f5f62cc619acdd7d42dc7b500703a5


    const addQuestion = () => {
        if (questions.length < 10) {
<<<<<<< HEAD
            setQuestions((prev) => {
                const lastQuestion = prev.at(-1) as CurrentQuestion;

                return [...prev, { questionId: lastQuestion.questionId + 1, answers: ["", ""], questionTitle: "" }]
            })
            setCurrentEditQuestion(questions.length)
=======
            setCurrentEditQuestion(questions.length);
            setQuestions((prev) => {
                const lastQuestion = prev.at(-1) as CurrentQuestion;
                return [...prev, { questionId: lastQuestion.questionId + 1, answers: ["", ""], questionTitle: "" }]
            })


>>>>>>> 47fd2e3757f5f62cc619acdd7d42dc7b500703a5
        }

    }

    function handleDragEnd(result: any) {
        const items = Array.from(questions);
<<<<<<< HEAD
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setQuestions(items);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {id , value} = e.target;
=======
        const editItem = items[currentEditQuestion];
        const [reorderedItem] = items.splice(result.source.index, 1);
        console.log(result.source.index)
        if (editItem.questionId === reorderedItem.questionId) {
            items.splice(result.destination.index, 0, reorderedItem);
            setQuestions(items);
            setCurrentEditQuestion(result.destination.index)
        } else {
            console.log(reorderedItem, 'reorderedItem')
            items.splice(result.destination.index, 0, reorderedItem);
            setQuestions(items);
            const editQuestionIndex = items.findIndex((question) => question.questionId === editItem.questionId);
            setCurrentEditQuestion(editQuestionIndex);
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
>>>>>>> 47fd2e3757f5f62cc619acdd7d42dc7b500703a5
        setQuestionDetails((prev) => {
            return id === "quizInputName" ? { ...prev, quizName: value } : { ...prev, quizDescription: value };
        });

    }


    return (
        <>
<<<<<<< HEAD
            <div className='form-Container'>
                <div className='top-Container'>
                    <div className='top-Buttons-Container'>
                        <div className='top-Right-btn'>
                            <button className='show-Quiz-Btn'>
                                <img className='Show-Quiz-Svg' src={ShowQuizBtn} alt='show quiz svg' />
                                צפייה בחידון
                            </button>
                        </div>
                        <div className='top-Left-Btn'>
                            <button className='link-btn'><img className='link-Btn-Svg' src={LinkBtn} /></button>
                            <button className='save-Btn'>
                                <img className='save-Btn-Svg' src={saveBtn} />
                                שמירה
                            </button>
                        </div>
                    </div>
                </div>
                <div className='quiz-Header-Container'>
                    <div className='quiz-Header-Image'> <img className='select-Image-Quiz-Svg' src={Selectimage} /></div>
                    <div className='title-Header-Container'>
                        <input type="text" id="quizInputName" placeholder="שאלה" className="quiz-input-name" value={questionDetails.quizName} onChange={handleChange} />
                        <TextField
                            id="outlined-multiline-static"
                            label="Multiline"
                            multiline
                            rows={4}
                            value={questionDetails.quizDescription}
                            onChange={handleChange}
                        />
                        {/* <h1>חידון ללא כותרת</h1>
                        <p>תיאור חידון</p> */}
                    </div>
                </div>
                <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="droppable">
                        {(provided) => (
                            <div className="all-final-questions" {...provided.droppableProps} ref={provided.innerRef}>
                                {questions.map((question, index: number) => (
                                    <Draggable
                                        key={question.questionId.toString()}
                                        draggableId={question.questionId.toString()}
                                        index={index}
                                    >
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                {currentEditQuestion === index ?

                                                    // React.Dispatch<React.SetStateAction<CurrentQuestion>>
                                                    // (question: CurrentQuestion | ((prev: CurrentQuestion) => CurrentQuestion)) => void
                                                    // setCurrentQuestion({...question}) | setCurrentQuestion((prev) => ({...question}));
                                                    <AddQuestionBox setCurrentQuestion={(q) => {
                                                        setQuestions(prev => {
                                                            // all the questions before this question...
                                                            // either `q` if it's an object or `q(question) if it's a function
                                                            // ...all the questions after this question

                                                            //                               (prev) => ({...question})         {...question}
                                                            return [...prev.slice(0, index), typeof q === 'function' ? q(question) : q, ...prev.slice(index + 1)]
                                                        })
                                                    }} currentQuestion={question} />
                                                    :
                                                    <FinalQuestionBox question={question as Question} />
                                                    // TODO: fix this!!
                                                }
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
                <div className='plus-btn-container'>
                    <button className='plus-btn' onClick={addQuestion}>
                        <img src={plusBtn} className='plus-btn-svg' alt='plus button svg' />
                    </button>
                </div>
            </div>
=======
            <CacheProvider value={cacheRtl}>
                <div className='form-container'>
                    <div className='top-container'>
                        <div className='top-buttons-container'>
                            <div className='top-right-btn'>

                                <button className='show-quiz-btn'>
                                    <img className='show-quiz-svg' src={ShowQuizBtn} alt='show your preview quiz' />
                                    צפייה בחידון
                                </button>
                            </div>
                            <div className='top-left-btn'>
                                <button className='link-btn'><img className='link-btn-svg' src={LinkBtn} /></button>
                                <button className='save-btn'>
                                    <img className='save-btn-svg' src={saveBtn} alt='save your quiz here ' />
                                    שמירה
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='quiz-header-container'>
                        <div className='quiz-header-image'>
                            <BootstrapTooltip title="הוספת תמונה לחידון">
                                <img className='select-image-quiz-svg' src={Selectimage} alt='add your quiz image here' />
                            </BootstrapTooltip>
                        </div>
                        <div className='title-header-container'>
                            <BootstrapTooltip title="שינוי שם">
                                <input type="text" id="quizInputName" placeholder="שם החידון" className="quiz-input-name" value={questionDetails.quizName} onChange={handleChange} />
                            </BootstrapTooltip>
                            <BootstrapTooltip title="שינוי שם">
                                <TextField
                                    id="outlined-multiline-static"
                                    label="תיאור חידון"
                                    multiline
                                    rows={2}
                                    value={questionDetails.quizDescription}
                                    onChange={handleChange}
                                />
                            </BootstrapTooltip>
                        </div>
                    </div>
                    <DragDropContext onDragEnd={handleDragEnd}>
                        <Droppable droppableId="droppable">
                            {(provided) => (
                                <div className="all-final-questions" {...provided.droppableProps} ref={provided.innerRef}>
                                    {questions.map((question, index: number) => (
                                        <Draggable
                                            key={question.questionId.toString()}
                                            draggableId={question.questionId.toString()}
                                            index={index}
                                        >
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                                                    {currentEditQuestion === index ?

                                                        <AddQuestionBox setCurrentQuestion={(q) => {
                                                            setQuestions(prev => {
                                                                return [...prev.slice(0, index), typeof q === 'function' ? q(question) : q, ...prev.slice(index + 1)]
                                                            })
                                                        }} currentQuestion={question} />
                                                        :
                                                        <FinalQuestionBox question={question as Question} />
                                                    }
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                    <div className='plus-btn-container'>
                        <BootstrapTooltip title=" הוספת שאלה">
                            <button className='plus-btn' onClick={addQuestion}>
                                <img src={plusBtn} className='plus-btn-svg' alt='add question to your quiz' />
                            </button>
                        </BootstrapTooltip>
                    </div>
                </div>
            </CacheProvider>
>>>>>>> 47fd2e3757f5f62cc619acdd7d42dc7b500703a5
        </>
    );
}

export default EditQuiz;

