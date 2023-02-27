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
import FinalBoxQuestions from './FinalBoxQuestions'
import { useAnswerContext } from '../context/AnswersContext'
import { CurrentQuestion } from '../utils/Interfaces'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const EditQuiz: FC = () => {

    const { setQuestions, questions, setEmptyQuestionEdit, emptyQuestionEdit } = useAnswerContext()
    const [currentEditQuestion, setCurrentEditQuestion] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState<CurrentQuestion>({
        questionId: 1,
        questionTitle: '',
        answers: ['', ''],
        correctAnswer: 0
    });

    useEffect(() => {
        console.log('currentQuestion:', currentQuestion)
        setQuestions([currentQuestion])
    }, [])

    const addQuestion = () => {
        setEmptyQuestionEdit(!emptyQuestionEdit)
        if (questions.length < 10) {
            console.log('questions:', questions)

            setQuestions((prev) => [...prev, currentQuestion])
            setCurrentEditQuestion(currentEditQuestion + 1)
            setCurrentQuestion(prevState => ({
                questionId: prevState.questionId + 1,
                questionTitle: '',
                answers: ['', ''],
                correctAnswer: 0
            }))
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
                                                    <AddQuestionBox setCurrentQuestion={setCurrentQuestion} currentQuestion={currentQuestion} />
                                                    :
                                                    <FinalBoxQuestions question={question} />
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
                        <img src={plusBtn} className='plus-btn-svg' />
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