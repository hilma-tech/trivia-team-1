import React, { FC, useState } from 'react';
import '../style/EditQuiz.scss'
import ShowQuizBtn from '../images/showquizzbtn.svg'
import LinkBtn from '../images/linkBtn.svg'
import saveBtn from '../images/saveBtn.svg'
import Selectimage from '../images/image.svg'
import AddQuestionBox from './AddQuestionBox'
import plusBtn from '../images/plusBtn.svg'
import FinalQuestionBox from './FinalQuestionBox'
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



const EditQuiz: FC = () => {

    const { setQuestions, questions } = useQuestionContext()
    console.log('questions: ', questions);
    const [currentEditQuestion, setCurrentEditQuestion] = useState(0);
    console.log('currentEditQuestion: ', currentEditQuestion);
    const [questionDetails, setQuestionDetails] = useState({ quizName: '', quizDescription: '', QuizImageUrl: '' })


    const addQuestion = () => {
        if (questions.length < 10) {
            setCurrentEditQuestion(currentEditQuestion + 1)
            setQuestions((prev) => {
                const lastQuestion = prev.at(-1) as CurrentQuestion;
                console.log('lastQuestion: ', lastQuestion);
                if(lastQuestion.questionId > currentEditQuestion) {
                    return [...prev.slice(0,currentEditQuestion) ,{ questionId: lastQuestion.questionId + 1, answers: ["", ""], questionTitle: "" }, ...prev.slice(currentEditQuestion+1)]
                }else{
                return [...prev, { questionId: lastQuestion.questionId + 1, answers: ["", ""], questionTitle: "" }]
                }
            })


        }

    }

    function handleDragEnd(result: any) {
        const items = Array.from(questions);
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
            let editQuestionIndex = 0;
            for (let question of items) {
                if (question.questionId === editItem.questionId) {
                    setCurrentEditQuestion(editQuestionIndex)
                } else {
                    editQuestionIndex++;
                }
            }
        }
        // const items = Array.from(questions);
        // const [reorderedItem] = items.splice(result.source.index, 1);
        // items.splice(result.destination.index, 0, reorderedItem);
        // setQuestions(items);
        // const newIndex = items.findIndex((item) => item.questionId === currentEditQuestion);
        // setCurrentEditQuestion(newIndex);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setQuestionDetails((prev) => {
            return id === "quizInputName" ? { ...prev, quizName: value } : { ...prev, quizDescription: value };
        });

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
                                                    <div style={{ display: 'flex' , justifyContent:'center' , flexDirection:'column', alignItems:'center' }}>
                                                        {currentEditQuestion === index ? (
                                                            <>
                                                                <AddQuestionBox setCurrentQuestion={(q) => {
                                                                    setQuestions(prev => {
                                                                        return [...prev.slice(0, index), typeof q === 'function' ? q(question) : q, ...prev.slice(index + 1)]
                                                                    })
                                                                }} currentQuestion={question} />
                                                                <div className='plus-btn-container'>
                                                                    <BootstrapTooltip title=" הוספת שאלה">
                                                                        <button className='plus-btn' onClick={addQuestion}>
                                                                            <img src={plusBtn} className='plus-btn-svg' alt='add question to your quiz' />
                                                                        </button>
                                                                    </BootstrapTooltip>
                                                                </div>
                                                            </>
                                                        )
                                                            :
                                                            <FinalQuestionBox question={question as Question} />
                                                        }
                                                    </div>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                    {/* <div className='plus-btn-container'>
                        <BootstrapTooltip title=" הוספת שאלה">
                            <button className='plus-btn' onClick={addQuestion}>
                                <img src={plusBtn} className='plus-btn-svg' alt='add question to your quiz' />
                            </button>
                        </BootstrapTooltip>
                    </div> */}
                </div>
            </CacheProvider>
        </>
    );
}

export default EditQuiz;

