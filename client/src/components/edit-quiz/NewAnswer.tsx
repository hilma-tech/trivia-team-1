<<<<<<< HEAD
import { IconButton, TextField, makeStyles, createStyles, Theme } from "@mui/material";
import React, { FC, useState, useContext, useEffect, useRef } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import Selectimage from '../../images/image.svg'
import TrashSvg from '../../images/trash.svg'
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import { CurrentQuestion } from "./utils/Interfaces";
import useMediaQuery from '@mui/material/useMediaQuery';


const theme = createTheme({
    direction: 'rtl', // Both here and <body dir="rtl">
});
// Create rtl cache
=======
import React, { FC } from "react";
import { IconButton, TextField} from "@mui/material";
import { createTheme } from '@mui/material/styles';
import rtlPlugin from 'stylis-plugin-rtl';
import createCache from '@emotion/cache';
import SelectImage from '../../images/image.svg'
import TrashSvg from '../../images/trash.svg'
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import { CurrentQuestion } from "../../utils/Interfaces";
import BootstrapTooltip from "../../tooltip/tooltip";


const theme = createTheme({
    direction: 'rtl',
});


>>>>>>> c82d01948bc0ee6b901faf93a12210f50aad67c4
const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [rtlPlugin],
});

<<<<<<< HEAD
interface Props {
=======
interface NewAnswerProps {
>>>>>>> c82d01948bc0ee6b901faf93a12210f50aad67c4
    answerIndex: number;
    isChecked?: boolean;
    setCurrentQuestion: React.Dispatch<React.SetStateAction<CurrentQuestion>>;
    currentQuestion: CurrentQuestion;
<<<<<<< HEAD
=======
    currentEditQuestion:number
>>>>>>> c82d01948bc0ee6b901faf93a12210f50aad67c4

}


<<<<<<< HEAD


const NewAnswer: FC<Props> = ({ answerIndex, isChecked = false, setCurrentQuestion, currentQuestion }) => {


    const isMobile = useMediaQuery('(max-width:600px)');
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        let copy = { ...currentQuestion };
        copy.answers[answerIndex] = e.target.value;
        console.log(copy);
        setCurrentQuestion(copy);
=======
const NewAnswer: FC<NewAnswerProps> = ({ answerIndex,  setCurrentQuestion, currentQuestion , currentEditQuestion }) => {



    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentQuestion(prev => {
            const answers = [...prev.answers];
            answers[answerIndex].text = e.target.value;
            return { ...prev, answers };
        });
>>>>>>> c82d01948bc0ee6b901faf93a12210f50aad67c4
    };

    const handleCorrectAnswer = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const isChecked = (e.target as HTMLInputElement).checked;
<<<<<<< HEAD
        let copyArr = { ...currentQuestion };
        copyArr.correctAnswer = isChecked ? answerIndex + 1 : -1;
        console.log(copyArr);
        setCurrentQuestion(copyArr);
=======
        setCurrentQuestion(prev => {
            const UpdateAnswers = prev.answers.map((answer, index) => {
                if (index === answerIndex) {
                    return {...answer , isCorrect: isChecked}
                }
                return answer;
            });
            return {...prev, answers: UpdateAnswers };
        });

    }

    const deleteAnswer = (e:any) => {
        setCurrentQuestion(prev => {
            return {...prev, answers: [...prev.answers.slice(0 ,answerIndex),...prev.answers.slice(answerIndex+1)]}
        })
>>>>>>> c82d01948bc0ee6b901faf93a12210f50aad67c4

    }

    return (
<<<<<<< HEAD
        <CacheProvider value={cacheRtl}>
            <div className="checkboxesContanier" dir='rtl'>
                <div className="checkboxSvg">
                    <FormControlLabel value={'' + answerIndex + 1} label="" control={<Radio checked={currentQuestion.correctAnswer === answerIndex + 1} onChange={handleCorrectAnswer} />} />

                </div>
                <div className="textFieldContainer">
                    <TextField className="width" sx={{ paddingBottom: '1px' }} label={`תשובה ${answerIndex + 1}`}
                        id="standard-size-small" variant={isMobile ? "outlined" : "standard"} value={currentQuestion.answers[answerIndex]} onChange={handleChange} />
                </div>

                <IconButton >
                    <img src={Selectimage} className="slectImageSvgForQuestions" />
                </IconButton>
                <IconButton>
                    <img src={TrashSvg} className="trashSvgForQuestions" />
                </IconButton>
            </div>
        </CacheProvider>
=======
        <div className="check-boxes-container" dir='rtl'>
            <div className="check-box-svg">
                <BootstrapTooltip title="סמן תשובה נכונה">
                    <FormControlLabel value={'' + answerIndex + 1} label="" control={<Radio checked={currentQuestion.answers[answerIndex].isCorrect} onChange={handleCorrectAnswer} />} />
                </BootstrapTooltip>
            </div>
            <div className="text-field-container">
                <TextField className="text-field-input" sx={{ paddingBottom: '1px' }} label={`תשובה ${answerIndex + 1}`}
                    id="standard-size-small" variant="standard" value={currentQuestion.answers[answerIndex].text} onChange={handleChange} />

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
>>>>>>> c82d01948bc0ee6b901faf93a12210f50aad67c4
    )

}

export default NewAnswer;