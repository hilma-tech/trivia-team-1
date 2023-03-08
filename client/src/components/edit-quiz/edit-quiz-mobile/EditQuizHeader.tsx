import { Box, Button, TextField, Typography, useMediaQuery } from "@mui/material"
import { FC, useState } from "react"
import ShowQuizBtn from '../../../images/showquizzbtn.svg'
import saveBtn from '../../../images/saveBtn.svg'
import LinkBtn from '../../../images/linkBtn.svg'
import Selectimage from '../../../images/image.svg'
import '../../../style/EditQuiz.scss'
import BootstrapTooltip from "../../../tooltip/tooltip"
import { FileInput, UploadedFile, useFiles } from '@hilma/fileshandler-client';
import useImageFileUpload from '../../../context/imageFilesZus'
import { imageFile } from "../../../utils/Interfaces"

interface QuizHeader {
    saveQuiz: () => void;
    questionDetails: {
        title: string;
        description: string;
        imageUrl: string;
    };
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    setPhonePage: React.Dispatch<React.SetStateAction<number>>;
    addQuestion: () => void;
    giveRightClasses: (originClassName: string) => string | undefined;

}


export const EditQuizHeader: FC<QuizHeader> = ({ giveRightClasses, addQuestion,saveQuiz, questionDetails, handleChange, setPhonePage }) => {
    const filesUploader = useFiles();
    const addImageFile = useImageFileUpload(setState => setState.addQuestionImage)

    const handleImageFile = (value: imageFile) => {
        addImageFile(value)
    }

    const isMobile: boolean = useMediaQuery('(max-width:600px)')
    return isMobile ? (
        <div>
        <div className={giveRightClasses("phone-first-page-container")} >
            <div className="input-container">
                <Typography variant="body1">שם המשחק</Typography>
                <TextField id="quizInputName" value={questionDetails.title} onChange={handleChange} />
            </div>
            <div className="input-container">
                <Typography variant="body1">תיאור</Typography>
                <TextField id="outlined-multiline-static" value={questionDetails.description} onChange={handleChange} />
            </div>
            <div className="select-image-container">
                <FileInput type="image" filesUploader={filesUploader} onChange={handleImageFile} className='upload-btn' />
                <BootstrapTooltip title="הוספת תמונה לחידון">
                    <img className='select-image-quiz-svg' src={Selectimage} alt='add your quiz photo here' />
                </BootstrapTooltip>
                <Typography variant="body1">העלאת תמונה</Typography>
            </div>

            <div className="button-container">
                <Button onClick={() => { setPhonePage(2) }} color="primary" variant="contained">המשך</Button>
            </div>
        </div>
            <div className="button-container-second-page">
                <Button className="add-a-question" onClick={addQuestion} color="info" variant="contained">+ הוספת שאלה</Button>
                <Button onClick={saveQuiz} color="primary" variant="contained">סיום</Button>
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
            </div>)
}