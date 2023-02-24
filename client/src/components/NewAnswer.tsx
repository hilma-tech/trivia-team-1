import { IconButton, TextField, makeStyles, createStyles, Theme } from "@mui/material";
import React, { FC, useState, useContext, useEffect, useRef } from "react";
import { useAnswerContext } from '../context/AnswersContext'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CheckBoxSvg from '../images/checkicon.svg';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import Selectimage from '../images/image.svg'
import TrashSvg from '../images/trash.svg'
import MuiCheckbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import { CurrentQuestion } from "../utils/Interfaces";
import { parse } from "node:path/win32";
// import { withStyles } from '@material-ui/core/styles';


const theme = createTheme({
    direction: 'rtl', // Both here and <body dir="rtl">
});
// Create rtl cache
const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [rtlPlugin],
});

interface Props {
    answerIndex: number;
    isChecked?: boolean;
    setCurrentQuestion: React.Dispatch<React.SetStateAction<CurrentQuestion>>;
    currentQuestion: CurrentQuestion;

}




const NewAnswer: FC<Props> = ({  answerIndex, isChecked = false, setCurrentQuestion, currentQuestion }) => {
  
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        let copy = { ...currentQuestion };
        copy.answers[answerIndex] = e.target.value;
        console.log(copy);
        setCurrentQuestion(copy);
    };

    const handleCorrectAnswer = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const isChecked = (e.target as HTMLInputElement).checked;
        let copyArr = { ...currentQuestion };
        copyArr.correctAnswer = isChecked ? answerIndex+1 : -1;
        console.log(copyArr);
        setCurrentQuestion(copyArr);

    }

    return (
        <CacheProvider value={cacheRtl}>
            <div className="checkboxesContanier" dir='rtl'>
                <div className="checkboxSvg">
                    <FormControlLabel value={'' + answerIndex+1}  label="" control={<Radio checked={currentQuestion.correctAnswer === answerIndex+1} onChange={handleCorrectAnswer} />} />
 
                </div>
                <div className="textFieldContainer">
                    <TextField className="width" sx={{ paddingBottom: '1px' }} label={`תשובה ${answerIndex+1}`}
                        id="standard-size-small" variant="standard" value={currentQuestion.answers[answerIndex]} onChange={handleChange} />

                </div>

                <IconButton >
                    <img src={Selectimage} className="slectImageSvgForQuestions" />
                </IconButton>
                <IconButton>
                    <img src={TrashSvg} className="trashSvgForQuestions" />
                </IconButton>
            </div>
        </CacheProvider>
    )

}

export default NewAnswer;