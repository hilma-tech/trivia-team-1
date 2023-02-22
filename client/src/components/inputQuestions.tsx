import { IconButton, TextField } from "@mui/material";
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
import { withStyles } from '@material-ui/core/styles';


const styles = {
    root: {
      '& .MuiInput-underline:before': {
        borderBottomWidth: '2px', // change this to resize the underline
      }
    },
  };


const theme = createTheme({
    direction: 'rtl', // Both here and <body dir="rtl">
});
// Create rtl cache
const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [rtlPlugin],
});

interface Props {
    questionNum: number;
    isChecked?: boolean;
    setAnswer: any;
    answer:any;

}

interface Icons {
    label: any;
    icon: any;
    checkedIcon: any;

}

const Checkbox: FC<Icons> = ({ label, icon, checkedIcon }) => {

    return (
        <FormControlLabel
            label={label}
            control={
                <MuiCheckbox defaultChecked icon={icon} checkedIcon={checkedIcon} />
            }
        />
    );
}


const MakeQuestion: FC<Props> = ({ questionNum, isChecked = false , setAnswer , answer }) => {
    const [checked, setChecked] = useState<boolean>(isChecked);
    const [howManyQuestions, setHowManyQuestions] = useState<number>(1);

    const ref = React.useRef(null)
    const { sendInput, setCurrentAnswers, currentAnswers  ,emptyQuestionEdit ,setEmptyQuestionEdit } = useAnswerContext()
    
   
    useEffect(() => {
        if(howManyQuestions !== currentAnswers.length && currentAnswers.length !==0 )  {
            console.log('hi')
            let copy  = {...answer};
            for (answer in copy){
                copy[answer] = '';
            }
            setHowManyQuestions(howManyQuestions + 1);
            setAnswer(copy)
         }

    }, [currentAnswers.length])


    const handleChange = (e: { target: any; }) => {
        let copy  = {...answer};
        copy[`answer${questionNum}`]= e.target.value;
        setAnswer(copy);
    };

    return (
        <CacheProvider value={cacheRtl}>
            <div className="checkboxesContanier" dir='rtl'>
                <div className="checkboxSvg">
                    <FormControlLabel value={'' + questionNum} control={<Radio />} label="" />
                </div>
                <div className="textFieldContainer">
                    <TextField sx={{ paddingBottom: '1px' }}  label={`תשובה ${questionNum}`}
                        id="standard-size-small" variant="standard" value={answer[`answer${questionNum}`] } onChange={handleChange} />

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

export default MakeQuestion;