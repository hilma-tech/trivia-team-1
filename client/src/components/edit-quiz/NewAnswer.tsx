import React, { FC } from "react";
import { IconButton, TextField } from "@mui/material";
import { createTheme } from '@mui/material/styles';
import rtlPlugin from 'stylis-plugin-rtl';
import createCache from '@emotion/cache';
import SelectImage from '../../images/image.svg'
import TrashSvg from '../../images/trash.svg'
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import { CurrentQuestion, imageFile } from "../../utils/Interfaces";
import BootstrapTooltip from "../../tooltip/tooltip";
import { FileInput, UploadedFile, useFiles } from '@hilma/fileshandler-client';
import useImageFileUpload from '../../context/imageFilesZus'
import { Index } from "typeorm";




const theme = createTheme({
    direction: 'rtl',
});


const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [rtlPlugin],
});

interface NewAnswerProps {
    answerIndex: number;
    isChecked?: boolean;
    setCurrentQuestion: React.Dispatch<React.SetStateAction<CurrentQuestion>>;
    currentQuestion: CurrentQuestion;
    currentEditQuestion: number

}


const NewAnswer: FC<NewAnswerProps> = ({ answerIndex, setCurrentQuestion, currentQuestion, currentEditQuestion }) => {

    const filesUploader = useFiles()
    const addImageFile = useImageFileUpload(setState => setState.addQuestionImage)


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentQuestion(prev => {
            const answers = [...prev.answers];
            answers[answerIndex].text = e.target.value;
            return { ...prev, answers };
        });
    };

    const handleCorrectAnswer = () => {
        setCurrentQuestion(prev => {
            const UpdateAnswers = prev.answers.map((answer, index) => {
                if (index === answerIndex) {
                    return { ...answer, isCorrect: true }
                }
                return { ...answer, isCorrect: false };
            });
            return { ...prev, answers: UpdateAnswers };
        });

    }

    const deleteAnswer = (e: any) => {
        setCurrentQuestion(prev => {
            return { ...prev, answers: [...prev.answers.slice(0, answerIndex), ...prev.answers.slice(answerIndex + 1)] }
        })

    }

    const handleImageFile = (value: imageFile) => {
        addImageFile(value)
        currentQuestion.answers[answerIndex].imageUrl = value.link;
    }


    return (
        <div className="check-boxes-container" dir='rtl'>
            <div className="check-box-svg">
                <BootstrapTooltip title="סמן תשובה נכונה">
                    <FormControlLabel
                        value={'' + answerIndex + 1}
                        label=""
                        control={<Radio
                            checked={currentQuestion.answers[answerIndex].isCorrect}
                            onChange={handleCorrectAnswer}
                        />}
                    />
                </BootstrapTooltip>
            </div>
            <div className="text-field-container">
                <TextField className="text-field-input" sx={{ paddingBottom: '1px' }} label={`תשובה ${answerIndex + 1}`}
                    id="standard-size-small" variant="standard" value={currentQuestion.answers[answerIndex].text} onChange={handleChange} />

            </div>


            {/* */}
            <IconButton centerRipple className="add-image-icon">
                <label>
                    <FileInput type="image" filesUploader={filesUploader} onChange={handleImageFile} className='upload-btn' />
                    <BootstrapTooltip title="הוספת תמונה לתשובה">
                        <img src={currentQuestion.answers[answerIndex].imageUrl ? currentQuestion.answers[answerIndex].imageUrl : SelectImage} className="add-image-icon-placeholder" alt='add image to your answer' />
                    </BootstrapTooltip>
                </label>
            </IconButton>


            <IconButton onClick={deleteAnswer} className="remove-answer">
                <img src={TrashSvg} className="trash-icon" alt='delete your answer here' />
            </IconButton>
        </div>
    )

}

export default NewAnswer;