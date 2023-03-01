import React, { FC, useState, useContext, useEffect, useRef } from "react";
import { IconButton, TextField, makeStyles, createStyles, Theme } from "@mui/material";
import { useQuestionContext } from '../context/AnswersContext'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CheckBoxSvg from '../images/checkicon.svg';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import SelectImage from '../images/image.svg'
import TrashSvg from '../images/trash.svg'
import MuiCheckbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import { CurrentQuestion } from "../utils/Interfaces";
import { parse } from "node:path/win32";
import BootstrapTooltip from "../tooltip/tooltip";


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

}


const NewAnswer: FC<NewAnswerProps> = ({ answerIndex, isChecked = false, setCurrentQuestion, currentQuestion }) => {

    const { setQuestions, questions } = useQuestionContext()


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentQuestion(prev => {
            const answers = [...prev.answers];
            answers[answerIndex] = e.target.value;
            return { ...prev, answers };
        });
    };

    const handleCorrectAnswer = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const isChecked = (e.target as HTMLInputElement).checked;
        setCurrentQuestion(prev => {
            return { ...prev, correctAnswer: isChecked ? answerIndex + 1 : undefined };
        });

    }

    const deleteAnswer = (e:any) => {
        setCurrentQuestion(prev => {
            return {...prev, answers: [...prev.answers.slice(0 ,answerIndex),...prev.answers.slice(answerIndex+1)]}
        })

    }

    return (
        <div className="check-boxes-container" dir='rtl'>
            <div className="check-box-svg">
                <BootstrapTooltip title="סמן תשובה נכונה">
                    <FormControlLabel value={'' + answerIndex + 1} label="" control={<Radio checked={currentQuestion.correctAnswer === answerIndex + 1} onChange={handleCorrectAnswer} />} />
                </BootstrapTooltip>
            </div>
            <div className="text-field-container">
                <TextField className="text-field-input" sx={{ paddingBottom: '1px' }} label={`תשובה ${answerIndex + 1}`}
                    id="standard-size-small" variant="standard" value={currentQuestion.answers[answerIndex]} onChange={handleChange} />

            </div>


            <IconButton >
                <BootstrapTooltip title="הוספת תמונה לתשובה">
                    <img src={SelectImage} className="select-image-svg-for-questions" alt='add image to your answer' />
                </BootstrapTooltip>
            </IconButton>


            <IconButton onClick={deleteAnswer}>
                <img src={TrashSvg} className="trash-svg-for-questions" alt='delete your answer here' />
            </IconButton>
        </div>
    )

}

export default NewAnswer;