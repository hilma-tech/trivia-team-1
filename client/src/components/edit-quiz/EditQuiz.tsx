import React, { FC, useEffect, useState } from 'react';
import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Button, useMediaQuery } from '@mui/material';
import { useLocation, useParams } from 'react-router';
import BootstrapTooltip from '../tooltip/tooltip'
import axios from 'axios';
import DemoQuiz from './DemoQuiz';
import littleArrow from '../../images/question-template/littleArrow.svg'

import AddQuestionBox from './AddQuestionBox';
import FinalQuestionBox from './FinalQuestionBox';
import { useQuestionContext } from '../../context/AnswersContext';
import { CurrentQuestion, Question, PhonePage, ImageFile } from '../../utils/Interfaces';
import { EditQuizHeader } from './edit-quiz-mobile/EditQuizHeader';
import PhoneNavBar from '../navbar/PhoneNavbar';
import { usePopContext } from '../popups/popContext'



import '../../style/EditQuiz.scss';
import plusBtn from '../../images/plusBtn.svg';
import MonkeySvg from '../../images/monkeyInEdit.svg';
import { PopUpType } from '../popups/GenericPopParts';
import { useUser } from '../../context/UserContext';


const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [rtlPlugin],
});

export const isFull = (question: CurrentQuestion) => {
    return question.answers.some(answer => answer.isCorrect)
        && question.answers.every(answer => answer.text !== '')
        && question.title !== "";
}

export type QuizDetails = {
    title: string;
    description: string;
    imageUrl: ImageFile;
}

const EditQuiz: FC = () => {

    const [moveToShowDemoQuizBool, setMoveToWatchDemoQuizBool] = useState(true);
    const isMobile = useMediaQuery('(max-width:600px)');
    const { setQuestions, questions } = useQuestionContext();
    const { user } = useUser();
    const { setSavedQuiz, setEditedQuizId } = usePopContext();
    const [phonePage, setPhonePage] = useState<PhonePage>(PhonePage.firstPage);
    const [currentEditQuestion, setCurrentEditQuestion] = useState(0);
    const [quizDetails, setQuizDetails] = useState<QuizDetails>({ title: '', description: '', imageUrl: { id: -1, link: '' } });
    const { popHandleClickOpen, setPopType } = usePopContext();
    const { quizId } = useParams();
    const location = useLocation();

    const isEditQuizPage = location.pathname.includes('edit-quiz')



    useEffect(() => {
        if (isEditQuizPage) {
            axios.get(`http://localhost:8080/api/quiz/${quizId}`)
                .then(function (response) {
                    setQuizDetails(() => {
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
                { id: 0, title: "", imageUrl: { id: -1, link: '' }, answers: [{ text: '', isCorrect: false, imageUrl: { id: -1, link: '' } }, { text: '', isCorrect: false, imageUrl: { id: -1, link: '' } }] }
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
                    return [...prev, { id: lastQuestion.id + 1, answers: [{ text: '', isCorrect: false, imageUrl: { id: -1, link: '' } }, { text: '', isCorrect: false, imageUrl: { id: -1, link: '' } }], title: "" }]
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
        setQuizDetails((prev) => {
            return id === "quizInputName" ? { ...prev, title: value } : { ...prev, description: value };
        });

    }


    const duplicateQuestion = () => {
        if (questions.length < 10) {
            setCurrentEditQuestion(questions.length);
            setQuestions((prev) => {
                if (prev[currentEditQuestion].answers.find(answer => answer.isCorrect === true) && prev[currentEditQuestion].answers.every(answer => answer.text !== '') && prev[currentEditQuestion].title !== "") {
                    const lastQuestion = prev.at(-1) as CurrentQuestion;
                    return [...prev, { id: lastQuestion.id + 1, answers: prev[currentEditQuestion].answers, title: prev[currentEditQuestion].title, isCorrect: prev[currentEditQuestion].answers.find(answer => answer.isCorrect), imageUrl: prev[currentEditQuestion].imageUrl }]
                } else {
                    setCurrentEditQuestion(prev[currentEditQuestion].id);
                    alert("Please add a correct inputs")
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




    const saveQuiz = async () => {
        if (questions.length <= 4) return alert("Please add at least 5 questions")
        const newQuestions = questions.map((question) => {
            const newAnswers = question.answers.map((answer) => {
                if (answer.imageUrl) {
                    return {
                        isCorrect: answer.isCorrect,
                        imageUrl: typeof answer.imageUrl === "string" ? answer.imageUrl : answer.imageUrl.id,
                        text: answer.text
                    }
                }
                else {
                    return { text: answer.text, isCorrect: answer.isCorrect }
                }
            })
            if (question.imageUrl) {
                return {
                    title: question.title,
                    imageUrl: typeof question.imageUrl === "string" ? question.imageUrl : question.imageUrl.id,
                    answers: newAnswers
                }
            }
            else {
                return { title: question.title, answers: newAnswers };
            }
        }
        )


        if (isEditQuizPage) {
            setPopType(PopUpType.SaveChanges);
            setEditedQuizId(quizId);
            setSavedQuiz(() => {
                if (quizDetails.imageUrl) {
                    return {
                        creatorId: user.userId,
                        title: quizDetails.title,
                        imageUrl: typeof quizDetails.imageUrl === "string" ? quizDetails.imageUrl : quizDetails.imageUrl.id,
                        description: quizDetails.description,
                        questions: newQuestions
                    }
                }
                else {
                    return {
                        creatorId: user.userId,
                        title: quizDetails.title,
                        description: quizDetails.description,
                        questions: newQuestions
                    }

                }
            }
            );
        }
        else {
            setPopType(PopUpType.AddQuiz);
            setSavedQuiz(() => {
                if (quizDetails.imageUrl) {
                    return {
                        creatorId: user.userId,
                        title: quizDetails.title,
                        imageUrl: typeof quizDetails.imageUrl === "string" ? quizDetails.imageUrl : quizDetails.imageUrl.id,
                        description: quizDetails.description,
                        questions: newQuestions
                    }
                }
                else {
                    return {
                        creatorId: user.userId,
                        title: quizDetails.title,
                        description: quizDetails.description,
                        questions: newQuestions
                    }

                }

            }
            );
        }
        popHandleClickOpen();


    }

    const toggleDemoAndEdit = () => {
        setMoveToWatchDemoQuizBool(!moveToShowDemoQuizBool)
    }

    return (

        !moveToShowDemoQuizBool ?
            <div>
                <button className='move-to-edit-button' onClick={() => toggleDemoAndEdit()}>
                    <img
                        src={littleArrow} alt="arrow"
                    />
                    <p>חזרה לעריכה</p>
                </button>                                           I
                <DemoQuiz />
            </div>
            :
            <>
                <CacheProvider value={cacheRtl}>
                    {isMobile && <PhoneNavBar title="יצירת משחק" type='image' />}
                    <div className='form-container'>
                        <div className='quiz-header-wrapper'>
                            <EditQuizHeader toggleDemoAndEdit={toggleDemoAndEdit} giveRightClasses={hideDivByPage} addQuestion={addQuestion} quizDetails={quizDetails} setQuizDetails={setQuizDetails} addQuiz={saveQuiz} handleChange={handleChange} setPhonePage={setPhonePage} />
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
