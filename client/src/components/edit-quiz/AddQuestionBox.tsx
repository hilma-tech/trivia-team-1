import React, { FC } from "react";
import NewAnswer from './NewAnswer'
import AddAnswer from '../../images/addAnswer.svg'
import duplicateSvg from '../../images/copy.svg'
import TrashSvg from '../../images/trash.svg'
import dragAndDropSvg from '../../images/drag-and-drop.svg'
import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';
import { CurrentQuestion } from '../../utils/Interfaces'
import { useQuestionContext } from "../../context/AnswersContext";
import { Button, TextField, Typography, useMediaQuery } from "@mui/material";
import { FileInput, UploadedFile } from '@hilma/fileshandler-client';
import BootstrapTooltip from "../tooltip/tooltip";
import { parseImageSrc } from "../../common/functions/parseImageSrc";



interface AddQuestionBoxProps {
    setCurrentQuestion: React.Dispatch<React.SetStateAction<CurrentQuestion>>;
    currentQuestion: CurrentQuestion;
    setCurrentEditQuestion: React.Dispatch<React.SetStateAction<number>>
    duplicateQuestion: () => void
    currentEditQuestion: number;
    index: number;

}


const AddQuestionBox: FC<AddQuestionBoxProps> = ({ setCurrentQuestion, currentQuestion, setCurrentEditQuestion, duplicateQuestion, currentEditQuestion, index }) => {


    const { setQuestions, questions } = useQuestionContext()
    const isMobile = useMediaQuery('(max-width:600px)');



    const { filesUploader } = useQuestionContext()

    const addAnswer = () => {
        if (currentQuestion.answers.length < 4) {
            setCurrentQuestion(prevState => ({
                ...prevState,
                answers: [...prevState.answers, { text: '', isCorrect: false, imageUrl: { id: -1, link: '' } }]
            }));
        }
    }


    const deleteQuestion = () => {
        let deleteIndex = questions.findIndex(question => question.id === currentQuestion.id)
        setQuestions(prevState => {
            return prevState.filter((question, index) => index !== deleteIndex);

        })
        setCurrentEditQuestion(questions.length - 2)

    }



    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setCurrentQuestion((prev) => {
            return { ...prev, title: e.target.value }
        });

    }

    const handleImageFile = (value: UploadedFile) => {
        setCurrentQuestion(prevState => {
            return { ...prevState, imageUrl: { id: value.id, link: value.link } }
        })

    }


    return (
        isMobile ?
            (<div className="add-questions-container-phone">
                <div className="question-number-container">
                    <h1 className="question-number">שאלה {index + 1}</h1>
                    <div className="copy-trash-imgs">
                        <button className="duplicate-btn" onClick={duplicateQuestion} >
                            {index === questions.length -1 && <img className="icon" src={duplicateSvg} alt='duplicate question' />}
                        </button>
                        <button className="trash-btn" onClick={deleteQuestion} >
                            <img className="icon" src={TrashSvg} alt='delete question' />
                        </button>
                    </div>
                </div>
                <div className="input-container second-page">
                    <Typography variant="body1">כותרת</Typography>
                    <div className="input-div">
                        <TextField id="quizInputName" className="title-question-header" value={currentQuestion.title} onChange={handleChange} />
                        <label className="label-in-new-answer">
                            <FileInput type="image" filesUploader={filesUploader} onChange={handleImageFile} className='upload-quiz-image-btn' />
                            <BootstrapTooltip title="הוספת תמונה לשאלה">
                                <img
                                    className='select-image-questions-svg'
                                    src={parseImageSrc(currentQuestion.imageUrl)}
                                    alt='add image to the question'
                                />
                            </BootstrapTooltip>
                        </label>

                    </div>
                </div>
                <div className="answer-container">
                    <FormControl>
                        <RadioGroup
                            name="radio-buttons-group"
                        >

                            {currentQuestion.answers.map((answer, index) => (
                                <NewAnswer key={index} answerIndex={index} setCurrentQuestion={setCurrentQuestion} currentQuestion={currentQuestion} currentEditQuestion={currentEditQuestion} />
                            ))}
                        </RadioGroup>
                    </FormControl>

                </div>
                <div className="add-answer-container">
                    <Button onClick={addAnswer} color="inherit" className="add-answer-btn">
                        <img src={AddAnswer} className="add-answer-svg" alt='add answer' />
                        הוספת תשובה
                    </Button>
                </div>
                <div className="hr-line"></div>
            </div>)
            :

            <div className='add-questions-container' >
                <div className='drag-and-drop-container'>
                    <BootstrapTooltip title="שינוי סדר השאלות">
                        <img className='drag-and-drop-svg' src={dragAndDropSvg} alt='drag to switch question place' />
                    </BootstrapTooltip>
                </div>

                <div className='quiz-questions-container'>
                    <div className='quiz-questions' >
                        <BootstrapTooltip title="שינוי שם">
                            <input type="text" placeholder="שאלה" className="question-input" value={currentQuestion.title} onChange={handleChange} />
                        </BootstrapTooltip>
                        <label>
                            <FileInput type="image" filesUploader={filesUploader} onChange={handleImageFile} className='upload-quiz-image-btn' />
                            <BootstrapTooltip title="הוספת תמונה לשאלה">
                                <img
                                    className='select-image-questions-svg'
                                    src={parseImageSrc(currentQuestion.imageUrl)}
                                    alt='add image'
                                />
                            </BootstrapTooltip>
                        </label>

                    </div>
                    <div className="answer-container">
                        <FormControl>
                            <RadioGroup
                                name="radio-buttons-group"
                            >

                                {currentQuestion.answers.map((answer, index) => (
                                    <NewAnswer key={index} answerIndex={index} setCurrentQuestion={setCurrentQuestion} currentQuestion={currentQuestion} currentEditQuestion={currentEditQuestion} />
                                ))}
                            </RadioGroup>
                        </FormControl>

                    </div>
                    <div className="add-answer-container">
                        <button onClick={addAnswer} className="add-answer-btn">
                            <img src={AddAnswer} className="add-answer-svg" alt='add answer ' /> הוספת תשובה
                        </button>
                    </div>
                    <div className="hr-line"></div>
                    <div className="footer-container-questions-btn">

                        <BootstrapTooltip title="שכפול">
                            <button className="duplicate-btn" onClick={duplicateQuestion}>
                                <img src={duplicateSvg} className="duplicate-svg" alt='duplicate your question' />
                            </button>
                        </BootstrapTooltip>
                        <BootstrapTooltip title="מחיקה">
                            <button className="trash-btn" onClick={deleteQuestion}>
                                <img src={TrashSvg} className="trash-svg" alt='delete question' />
                            </button>
                        </BootstrapTooltip>
                    </div>
                </div>
            </div>
    )
};



export default AddQuestionBox;