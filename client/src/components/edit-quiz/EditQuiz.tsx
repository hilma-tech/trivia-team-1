import React, { FC, useEffect, useState } from 'react';
import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Button, TextField, useMediaQuery } from '@mui/material';
import { useLocation, useParams } from 'react-router';
import BootstrapTooltip from '../tooltip/tooltip'
import axios from 'axios';

import AddQuestionBox from './AddQuestionBox';
import FinalQuestionBox from './FinalQuestionBox';
import { useQuestionContext } from '../../context/AnswersContext';
import { CurrentQuestion, Question, PhonePage } from '../../utils/Interfaces';
import { EditQuizHeader } from './edit-quiz-mobile/EditQuizHeader';
import PhoneNavBar from '../navbar/PhoneNavbar';
import { usePopContext } from '../popups/popContext'



import '../../style/EditQuiz.scss';
import plusBtn from '../../images/plusBtn.svg';
import MonkeySvg from '../../images/monkeyInEdit.svg';
import { PopUpType } from '../popups/GenericPopParts';


const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [rtlPlugin],
});



export const isFull = (question: CurrentQuestion) => {
    return question.answers.some(answer => answer.isCorrect)
        && question.answers.every(answer => answer.text !== '')
        && question.title !== "";
}

const EditQuiz: FC = () => {
    const isMobile = useMediaQuery('(max-width:600px)');
    const { setQuestions, questions } = useQuestionContext();
    const {savedQuiz, setSavedQuiz,setEditedQuizId} = usePopContext();
    const [phonePage, setPhonePage] = useState<PhonePage>(PhonePage.firstPage);
    const [currentEditQuestion, setCurrentEditQuestion] = useState(0);
    const [questionDetails, setQuestionDetails] = useState({ title: '', description: '', imageUrl: '' });
    const { popHandleClickOpen, popHandleClose, setPopType, approvedPops } = usePopContext();
    const { quizId } = useParams();
    const location = useLocation();

    const isEditQuizPage = location.pathname.includes('edit-quiz')



    useEffect(() => {
        if (isEditQuizPage) {
            axios.get(`http://localhost:8080/api/quiz/${quizId}`)
                .then(function (response) {
                    setQuestionDetails(() => {
                        return { title: response.data.title, description: response.data.description, imageUrl: response.data.imageUrl }
                    })
                    const getQuestions = response.data.questions;
                    setQuestions(getQuestions)
                })
                .catch(function (error) {
                    console.log(error)
                })

        } else {
            setQuestions([
                { id: 0, title: "", imageUrl: '', answers: [{ text: '', isCorrect: false, imageUrl: '' }, { text: '', isCorrect: false, imageUrl: '' }] }
            ]);
        }
    }, []);

    const hideDivByPage = (originClassName: string) => {
        if (!isMobile) return originClassName;
        if (originClassName === 'monkey-svg' || originClassName === 'plus-btn-container') return 'hide'
        if (phonePage === PhonePage.secondPage && originClassName === 'phone-first-page-container') return 'hide'
        if (phonePage === PhonePage.firstPage && (originClassName === 'question-dnd-container' || originClassName === 'monkey-svg' || originClassName === 'top-container' || originClassName === 'footer-button-container-second-page')) return 'hide';
        return originClassName
    }

    const addQuestion = () => {

        if (questions.length < 10) {
            setCurrentEditQuestion(questions.length);
            setQuestions((prev) => {
                if (isFull(prev[currentEditQuestion])) {
                    const lastQuestion = prev.at(-1) as CurrentQuestion;
                    return [...prev, { id: lastQuestion.id + 1, answers: [{ text: '', isCorrect: false, imageUrl: '' }, { text: '', isCorrect: false, imageUrl: '' }], title: "" }]
                } else {
                    setCurrentEditQuestion(prev[currentEditQuestion].id);
                    alert("Please add a correct answer")
                    return prev;
                }
            })
            setTimeout(
                () => {
                    if (isMobile) {
                        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
                    }
                }, 50)
        }

    }

    function handleDragEnd(result: any) {
        const items = Array.from(questions);
        const editItem = items[currentEditQuestion];
        const [reorderedItem] = items.splice(result.source.index, 1);
        if (editItem.id === reorderedItem.id) {
            items.splice(result.destination.index, 0, reorderedItem);
            setQuestions(items);
            setCurrentEditQuestion(result.destination.index)
        } else {
            items.splice(result.destination.index, 0, reorderedItem);
            setQuestions(items);
            const editQuestionIndex = items.findIndex((question) => question.id === editItem.id);
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
                    return [...prev, { id: lastQuestion.id + 1, answers: prev[currentEditQuestion].answers, title: prev[currentEditQuestion].title, isCorrect: prev[currentEditQuestion].answers.find(answer => answer.isCorrect) }]
                } else {
                    setCurrentEditQuestion(prev[currentEditQuestion].id);
                    alert("Please add a correct inputs")
                    return prev;
                }
            })


        }
    }




    const saveQuiz = async () => {
        if(questions.length <=4) return alert("Please add at least 5 questions")

        if(isEditQuizPage){
            setPopType(PopUpType.SaveChanges);
            setEditedQuizId(quizId);
            setSavedQuiz({
                creatorId: 11,
                title: questionDetails.title,
                description: questionDetails.description,
                questions: questions
            });
        }
        else{
            setPopType(PopUpType.AddQuiz);
            setSavedQuiz({
                creatorId: 11,
                title: questionDetails.title,
                description: questionDetails.description,
                questions: questions
            });
        }
        popHandleClickOpen();

    }



    return (
        <>
            <CacheProvider value={cacheRtl}>
                {isMobile && <PhoneNavBar title="יצירת משחק" type='image' />}
                <div className='form-container'>
                    <div className='quiz-header-wrapper'>
                        <EditQuizHeader giveRightClasses={hideDivByPage} addQuestion={addQuestion} questionDetails={questionDetails} addQuiz={saveQuiz} handleChange={handleChange} setPhonePage={setPhonePage} />
                    </div>
                    <div className={hideDivByPage('question-dnd-container')}>
                        <DragDropContext onDragEnd={handleDragEnd}>
                            <Droppable droppableId="droppable">
                                {(provided) => (
                                    <div className="all-final-questions" {...provided.droppableProps} ref={provided.innerRef}>
                                        {questions.map((question, index) => (
                                            <Draggable
                                                key={question.id.toString()}
                                                draggableId={question.id.toString()}
                                                index={index}
                                            >
                                                {(provided) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                    >

                                                        {currentEditQuestion === index || isMobile ?
                                                            <AddQuestionBox setCurrentQuestion={(q) => {
                                                                setQuestions(prev => {
                                                                    return [...prev.slice(0, index), typeof q === 'function' ? q(question) : q, ...prev.slice(index + 1)]
                                                                })
                                                            }} currentQuestion={question} setCurrentEditQuestion={setCurrentEditQuestion} currentEditQuestion={currentEditQuestion} duplicateQuestion={duplicateQuestion} index={index} />
                                                            :
                                                            <FinalQuestionBox question={question as Question} index={index} setCurrentEditQuestion={setCurrentEditQuestion} currentEditQuestion={currentEditQuestion} />
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
                    </div>
                    <div className={hideDivByPage('plus-btn-container')}>
                        <BootstrapTooltip title=" הוספת שאלה">
                            <button className='plus-btn' onClick={addQuestion}>
                                <img src={plusBtn} className='plus-btn-svg' alt='add question to your quiz' />
                            </button>
                        </BootstrapTooltip>
                    </div>

                </div >
                <div className='monkey-in-edit-page'>
                    <img src={MonkeySvg} className={hideDivByPage('monkey-svg')} alt='image of cute monkey with computer' />
                </div>
                {isMobile &&
                    <div className='edit-quiz-footer-container'>
                        <div className={hideDivByPage("footer-button-container-second-page")}>
                            <Button className="add-a-question" onClick={addQuestion} color="info" variant="contained">+ הוספת שאלה</Button>
                            <Button onClick={saveQuiz} color="primary" variant="contained">סיום</Button>
                        </div>
                    </div>
                }

            </CacheProvider >
        </>
    );
}

export default EditQuiz;
