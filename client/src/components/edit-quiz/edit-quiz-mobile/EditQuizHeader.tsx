import { Box, Button, TextField, Typography, useMediaQuery } from "@mui/material"
import { FC, useState } from "react"
import ShowQuizBtn from '../../../images/showquizzbtn.svg'
import saveBtn from '../../../images/saveBtn.svg'
import LinkBtn from '../../../images/linkBtn.svg'
import '../../../style/EditQuiz.scss'
import BootstrapTooltip from "../../tooltip/tooltip"
import { FileInput, UploadedFile, useFiles } from '@hilma/fileshandler-client';
import useImageFileUpload from '../../../context/imageFilesZus'
import { ImageFile, PhonePage } from "../../../utils/Interfaces"
import { useQuestionContext } from '../../../context/AnswersContext'
import { QuizDetails } from "../EditQuiz"
import { parseImageSrc } from '../../../common/functions/parseImageSrc';

interface QuizHeader {
    addQuiz: () => void;
    quizDetails: QuizDetails;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    setPhonePage: React.Dispatch<React.SetStateAction<number>>;
    addQuestion: () => void;
    giveRightClasses: (originClassName: string) => string | undefined;
    setQuizDetails: React.Dispatch<React.SetStateAction<QuizDetails>>

}

export const EditQuizHeader: FC<QuizHeader> = ({ giveRightClasses, addQuestion, addQuiz, quizDetails, handleChange, setPhonePage, setQuizDetails }) => {
    const addImageFile = useImageFileUpload(setState => setState.addQuestionImage);

    const { filesUploader } = useQuestionContext()

    const handleImageFile = (value: UploadedFile) => {
        setQuizDetails(prevState => {
            return { ...prevState, imageUrl: { id: value.id, link: value.link } }
        })

    }

    const handleMovePage = () => {
        if (quizDetails.title && quizDetails.description) setPhonePage(PhonePage.secondPage);
        else {
            alert('צריך למלא את הכותרת ואת התיאור על מנת להמשיך לעמוד הבא')
        }
    }

    const isMobile: boolean = useMediaQuery('(max-width:600px)')
    return isMobile ? (
        <div className="first-page-wrapper">
            <div className={giveRightClasses("phone-first-page-container")} >
                <div className="input-container">
                    <Typography variant="body1">שם המשחק</Typography>
                    <TextField id="quizInputName" value={quizDetails.title} onChange={handleChange} />
                </div>
                <div className="input-container">
                    <Typography variant="body1">תיאור</Typography>
                    <TextField id="outlined-multiline-static" value={quizDetails.description} onChange={handleChange} />
                </div>
                <div>
                    <label className="select-image-container">
                        <FileInput type="image" filesUploader={filesUploader} onChange={handleImageFile} className='upload-quiz-image-btn' />
                        <BootstrapTooltip title="הוספת תמונה לחידון">
                            <img
                                className={quizDetails.imageUrl ? 'quiz-image-in' : 'select-image-quiz-svg'}
                                src={parseImageSrc(quizDetails.imageUrl)}
                                alt='add your quiz photo here'
                            />
                        </BootstrapTooltip>
                        {!quizDetails.imageUrl && <Typography variant="body1">העלאת תמונה</Typography>}
                    </label>

                </div>

                <div className="button-container">
                    <Button onClick={handleMovePage} color="primary" variant="contained">המשך</Button>
                </div>
            </div>

        </div>)
        :
        (
            <div>
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
                            <button className='save-btn' onClick={addQuiz}>
                                <img className='save-btn-svg' src={saveBtn} alt='save your quiz here ' />
                                שמירה
                            </button>
                        </div>
                    </div>
                </div>
                <div className='quiz-header-container'>
                    <label style={{ border: 'none' }}>
                        <div className='quiz-header-image'>
                            <FileInput type="image" filesUploader={filesUploader} onChange={handleImageFile} className='upload-quiz-image-btn' />
                            <BootstrapTooltip title="הוספת תמונה לחידון">
                                <img
                                    className='select-image-quiz-svg'
                                    src={parseImageSrc(quizDetails.imageUrl)}
                                    alt='add your quiz photo here'
                                />
                            </BootstrapTooltip>
                        </div>
                    </label>
                    <div className='title-header-container'>
                        <BootstrapTooltip title="שינוי שם">
                            <input type="text" id="quizInputName" placeholder="שם החידון" className="quiz-input-name" value={quizDetails.title} onChange={handleChange} />
                        </BootstrapTooltip>
                        <BootstrapTooltip title="שינוי שם">
                            <TextField
                                id="outlined-multiline-static"
                                label="תיאור חידון"
                                multiline
                                rows={2}
                                value={quizDetails.description}
                                onChange={handleChange}
                            />
                        </BootstrapTooltip>
                    </div>
                </div>
            </div>)
}