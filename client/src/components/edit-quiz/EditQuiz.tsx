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
import { TextField, useMediaQuery } from '@mui/material';
import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import BootstrapTooltip from '../../tooltip/tooltip'
import MonkeySvg from '../../images/monkeyInEdit.svg'
import axios from 'axios'
import PhoneNavBar from '../navbar/PhoneNavbar';
import { EditQuizHeader } from './edit-quiz-mobile/EditQuizHeader';




const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [rtlPlugin],
});



const EditQuiz: FC = () => {

    const isMobile = useMediaQuery('(max-width:600px)');
    const { setQuestions, questions } = useQuestionContext();
    const [phonePage, setPhonePage] = useState(1)
    console.log('questions: ', questions);
    const [currentEditQuestion, setCurrentEditQuestion] = useState(0);
    console.log('currentEditQuestion: ', currentEditQuestion);
    const [questionDetails, setQuestionDetails] = useState({ title: '', description: '', imageUrl: '' })

    const giveRightClasses = (originClassName: string) => {
        if (!isMobile) return originClassName;
        if (phonePage === 2 && (originClassName === 'top-container' || originClassName === 'quiz-header-container')) return 'hide'
        if (phonePage === 1 && (originClassName === 'question-dnd-container' || originClassName === 'monkey-svg' || originClassName === 'top-container')) return 'hide'

    }

    const addQuestion = () => {
        if (questions.length < 10) {
            setCurrentEditQuestion(questions.length);
            console.log('currentEditQuestionIn: ', currentEditQuestion)
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
                console.log('prev: ', prev);
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
        console.log('here');

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
                {isMobile && <PhoneNavBar title="יצירת משחק" type='image' />}
                <div className='form-container'>

                    {phonePage === 1 && <EditQuizHeader saveQuiz={saveQuiz} handleChange={handleChange} questionDetails={questionDetails} setPhonePage={setPhonePage}/>}

                    <div className={giveRightClasses('question-dnd-container')}>
                        <DragDropContext onDragEnd={handleDragEnd}>
                            <Droppable droppableId="droppable">
                                {(provided) => (
                                    <div className={giveRightClasses("all-final-questions questions-container")} {...provided.droppableProps} ref={provided.innerRef}>
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

                </div>
                <div className='monkey-in-edit-page-svg'>
                    <img src={MonkeySvg} className={giveRightClasses('monkey-svg')} alt='image of cute monkey with computer' />
                </div>
            </CacheProvider>
        </>
    );
}

export default EditQuiz;

