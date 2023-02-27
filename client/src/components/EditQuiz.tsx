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
import { CurrentQuestion, Question } from '../utils/Interfaces'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const EditQuiz: FC = () => {

    const { setQuestions, questions } = useAnswerContext()
    const [currentEditQuestion, setCurrentEditQuestion] = useState(0);

    const addQuestion = () => {
        if (questions.length < 10) {
            setQuestions((prev) => {
                const lastQuestion = prev.at(-1) as CurrentQuestion;
                
                return [...prev, { questionId: lastQuestion.questionId + 1, answers: ["", ""], questionTitle: ""}]
            })
            setCurrentEditQuestion(questions.length)
        }

    }

    function handleDragEnd(result: any) {
        const items = Array.from(questions);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setQuestions(items);
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
        </>
    );
}

export default EditQuiz;


{/* <div className='all-final-questions'>
{questions.map((item, index: number) => (
    currentEditQuestion === index ?
        <AddQuestionBox
            key={index}
            setCurrentQuestion={setCurrentQuestion}
            currentQuestion={currentQuestion}
        />
        : (
                <FinalBoxQuestions
                    key={index}
                    questionId={index + 1}
                />
        )
))};
</div> */}