import React, { FC } from "react";
import Selectimage from '../../images/image.svg'
import NewAnswer from './NewAnswer'
import AddAnswer from '../../images/addAnswer.svg'
import duplicateSvg from '../../images/copy.svg'
import TrashSvg from '../../images/trash.svg'
import dragAndDropSvg from '../../images/drag-and-drop.svg'
import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';
import { CurrentQuestion , imageFile } from '../../utils/Interfaces'
import { useQuestionContext } from "../../context/AnswersContext";
import BootstrapTooltip from "../../tooltip/tooltip";
import { FileInput, UploadedFile, useFiles } from '@hilma/fileshandler-client';
import useImageFileUpload from '../../context/imageFilesZus'




interface AddQuestionBoxProps {
    setCurrentQuestion: React.Dispatch<React.SetStateAction<CurrentQuestion>>;
    currentQuestion: CurrentQuestion;
    setCurrentEditQuestion: React.Dispatch<React.SetStateAction<number>>
    duplicateQuestion: () => void
    currentEditQuestion: number;
    index : number;


}


const AddQuestionBox: FC<AddQuestionBoxProps> = ({ setCurrentQuestion, currentQuestion, setCurrentEditQuestion, duplicateQuestion, currentEditQuestion , index }) => {

    const { setQuestions, questions } = useQuestionContext()
    const addImageFile = useImageFileUpload(setState => setState.addQuestionImage)
    const questionsImagesArr = useImageFileUpload(state => state.questionImagesObject)




    const filesUploader = useFiles()



    const addAnswer = () => {
        if (currentQuestion.answers.length < 4) {
            setCurrentQuestion(prevState => ({
                ...prevState,
                answers: [...prevState.answers, { text: '', isCorrect: false, imageUrl: '' }]
            }));
        }
    }


    const deleteQuestion = () => {
        let deleteIndex = questions.findIndex(question => question.questionId === currentQuestion.questionId)
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

    const handleImageFile = (value :imageFile) => {
        value.questionIndex = currentEditQuestion
        addImageFile(value)
        currentQuestion.imageUrl = value.link;
    }


    return (
        <div className='add-questions-container' >
            <div className='darg-and-drop-container'>
                <BootstrapTooltip title="שינוי סדר השאלות">
                    <img className='drag-and-drop-svg' src={dragAndDropSvg} alt='drag button to switch question place' />
                </BootstrapTooltip>
            </div>

            <div className='quiz-questions-container'>
                <div className='quiz-questions' >
                    <BootstrapTooltip title="שינוי שם">
                        <input type="text" placeholder="שאלה" className="question-input" value={currentQuestion.title} onChange={handleChange} />
                    </BootstrapTooltip>
                    <label>
                        <FileInput type="image" filesUploader={filesUploader} onChange={handleImageFile} className='upload-btn' />
                        <BootstrapTooltip title="הוספת תמונה לשאלה">
                            <img className='select-image-questions-svg' src={currentQuestion.imageUrl ? currentQuestion.imageUrl : Selectimage} alt='add here to the question' />
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
                        <img src={AddAnswer} className="add-answer-svg" alt='add answer to your question' /> הוספת תשובה
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
                            <img src={TrashSvg} className="trash-svg" alt='delete your question' />
                        </button>
                    </BootstrapTooltip>
                </div>
            </div>
        </div>
    )
};


export default AddQuestionBox;

function questionImageObject(arg0: (state: any) => any) {
    throw new Error("Function not implemented.");
}
