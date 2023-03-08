import React, { FC, useState } from 'react';
import '../../style/EditQuiz.scss'
import ShowQuizBtn from '../../images/showquizzbtn.svg'
import LinkBtn from '../../images/linkBtn.svg'
import saveBtn from '../../images/saveBtn.svg'
import Selectimage from '../../images/image.svg'
import AddQuestionBox from './AddQuestionBox'
import plusBtn from '../../images/plusBtn.svg'
import FinalQuestionBox from './FinalQuestionBox'
import { useQuestionContext } from '../../context/AnswersContext'
import { CurrentQuestion, Question } from '../../utils/Interfaces'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { TextField } from '@mui/material';
import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import BootstrapTooltip from '../../tooltip/tooltip'
import MonkeySvg from '../../images/monkeyInEdit.svg'
import axios from 'axios';




const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [rtlPlugin],
});



const EditQuiz: FC = () => {

    const { setQuestions, questions } = useQuestionContext()
    const [currentEditQuestion, setCurrentEditQuestion] = useState(0);
    const [questionDetails, setQuestionDetails] = useState({ title: '', description: '', imageUrl: '' })


    const addQuestion = () => {
        if (questions.length < 10) {
            setCurrentEditQuestion(questions.length);
            setQuestions((prev) => {
                if (prev[currentEditQuestion].answers.find(answer => answer.isCorrect === true) && prev[currentEditQuestion].answers.every(answer => answer.text !== '') && prev[currentEditQuestion].title !== "") {
                    const lastQuestion = prev.at(-1) as CurrentQuestion;
                    return [...prev, { questionId: lastQuestion.questionId + 1, answers: [{ text: '', isCorrect: false, imageUrl: '' }, { text: '', isCorrect: false, imageUrl: '' }], title: "" }]
                } else {
                    setCurrentEditQuestion(prev[currentEditQuestion].questionId);
                    alert("Please add a correct answer")
                    return prev;
                }
            })


        }

    }

    function handleDragEnd(result: any) {
        const items = Array.from(questions);
        const editItem = items[currentEditQuestion];
        const [reorderedItem] = items.splice(result.source.index, 1);
        if (editItem.questionId === reorderedItem.questionId) {
            items.splice(result.destination.index, 0, reorderedItem);
            setQuestions(items);
            setCurrentEditQuestion(result.destination.index)
        } else {
            items.splice(result.destination.index, 0, reorderedItem);
            setQuestions(items);
            const editQuestionIndex = items.findIndex((question) => question.questionId === editItem.questionId);
            setCurrentEditQuestion(editQuestionIndex);
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setQuestionDetails((prev) => {
            return id === "quizInputName" ? { ...prev, title: value } : { ...prev, description: value };
        });

    }


    const duplicateQuestion = () => {
        if (questions.length < 10) {
            setCurrentEditQuestion(questions.length);
            setQuestions((prev) => {
                if (prev[currentEditQuestion].answers.find(answer => answer.isCorrect === true) && prev[currentEditQuestion].answers.every(answer => answer.text !== '') && prev[currentEditQuestion].title !== "") {
                    const lastQuestion = prev.at(-1) as CurrentQuestion;
                    return [...prev, { questionId: lastQuestion.questionId + 1, answers: prev[currentEditQuestion].answers, title: prev[currentEditQuestion].title, isCorrect: prev[currentEditQuestion].answers.find(answer => answer.isCorrect) }]
                } else {
                    setCurrentEditQuestion(prev[currentEditQuestion].questionId);
                    alert("Please add a correct inputs")
                    return prev;
                }
            })


        }
    }


    const saveQuiz = () => {

        axios.post('http://localhost:8080/api/quiz', {
            creatorId: 1,
            title: questionDetails.title,
            description: questionDetails.description,
            questions: questions
        })
            .then(function (res) {
                console.log(res)
            })
            .catch(function (err) {
                console.log(err)
            })
    }



    return (
        <>
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
                                <button className='save-btn' onClick={saveQuiz}>
                                    <img className='save-btn-svg' src={saveBtn} alt='save your quiz here ' />
                                    שמירה
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='quiz-header-container'>
                        <div className='quiz-header-image'>
                            <BootstrapTooltip title="הוספת תמונה לחידון">
                                <img className='select-image-quiz-svg' src={Selectimage} alt='add your quiz photo here' />
                            </BootstrapTooltip>
                        </div>
                        <div className='title-header-container'>
                            <BootstrapTooltip title="שינוי שם">
                                <input type="text" id="quizInputName" placeholder="שם החידון" className="quiz-input-name" value={questionDetails.title} onChange={handleChange} />
                            </BootstrapTooltip>
                            <BootstrapTooltip title="שינוי שם">
                                <TextField
                                    id="outlined-multiline-static"
                                    label="תיאור חידון"
                                    multiline
                                    rows={2}
                                    value={questionDetails.description}
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
                                                        }} currentQuestion={question} setCurrentEditQuestion={setCurrentEditQuestion} currentEditQuestion={currentEditQuestion} duplicateQuestion={duplicateQuestion} />
                                                        :
                                                        <FinalQuestionBox question={question as Question} index={index} setCurrentEditQuestion={setCurrentEditQuestion} />
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
                <div className='monkey-in-edit-page-svg'>
                    <img src={MonkeySvg} className='monkey-svg' alt='image of cute monkey with computer' />
                </div>
            </CacheProvider>
        </>
    );
}

export default EditQuiz;
