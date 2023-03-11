import { FC, useState } from "react";
import { FileInput, FilesUploader, UploadedFile, useFiles } from '@hilma/fileshandler-client';
import { FormControlLabel, IconButton, Radio, TextField, Typography } from "@mui/material";
import { MobileInputType } from "../../../utils/Interfaces";
import SelectImage from '../../../images/image.svg'
import TrashSvg from '../../../images/trash.svg'

const EditQuizMobileInput: FC<MobileInputType> = ({ answerIndex, currentQuestion, uploadedImageUrl, filesUploader, handleImageFile, deleteAnswer, handleCorrectAnswer, handleChange, setUploadedImageUrl }) => {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)
    return (
        (!uploadedImageUrl) ?
            <div className="input-container radio-question input-div">
                <FormControlLabel value={'' + answerIndex + 1} label="" control={<Radio checked={currentQuestion.answers[answerIndex].isCorrect} onChange={handleCorrectAnswer} />} />
                <TextField className={uploadedImageUrl ? 'make-into-div-size' : ''} placeholder={`תשובה ${answerIndex + 1}`} id="standard-size-small" value={currentQuestion.answers[answerIndex].text} onChange={handleChange} />
                <label className="label-in-new-answer">
                    <FileInput type="image" filesUploader={filesUploader} onChange={handleImageFile} className='upload-btn' />
                    <img src={SelectImage} className={uploadedImageUrl ? "select-image-svg-for-questions  image-answer-after-added" : "select-image-svg-for-questions"} alt='add image to your answer' />
                </label>
                <IconButton onClick={deleteAnswer}>
                    <img src={TrashSvg} className="trash-svg-for-questions" alt='delete your answer here' />
                </IconButton>
            </div>
            :
            <div>
                <div className="div-question-radio-mobile-container radio-question">
                    <div className="radio-container">
                        <FormControlLabel value={'' + answerIndex + 1} label="" control={<Radio checked={currentQuestion.answers[answerIndex].isCorrect} onChange={handleCorrectAnswer} />} />
                    </div>
                    <div className="mobile-question">
                        <div className="typography">
                            <Typography variant="body1">{currentQuestion.answers[answerIndex].text}</Typography>
                            <img src={SelectImage} className="select-image-svg-for-questions  select-image-after-added" alt='add image to your answer' />
                        </div>
                        <div className="question-image-container">
                            <img src={uploadedImageUrl} />
                            <div className="trash-svg-container" style={{left: screenWidth/4 + 'px'}} onClick={() => { setUploadedImageUrl('') }}>
                                <img src={TrashSvg} className="icon trash-on-answer" />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
    )
}

export default EditQuizMobileInput;