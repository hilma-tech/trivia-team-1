import React, { FC, useState, useEffect } from "react";
import Selectimage from '../images/image.svg'
import MakeQuestion from './inputQuestions'
import AddAnswer from '../images/addAnswer.svg'
import duplicateSvg from '../images/copy.svg'
import TrashSvg from '../images/trash.svg'
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import { IconButton, TextField } from "@mui/material";
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import { Answers } from '../utils/Interfaces'


interface Props {
    setAnswer: any;
    answer: Answers;

}


const AddQutionsBox: FC<Props> = ({ setAnswer, answer }) => {

    const [answersArr, setAnswersArr] = useState([1, 1]);

    const addAnswer = () => {
        if (answersArr.length < 4) {
            setAnswersArr([...answersArr, 1]);
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        let copy = { ...answer };
        copy.question = e.target.value;
        setAnswer(copy);

    }

    return (
        <div className='addQutionsContainer'>
            <div className='darganddropContainer'><button></button></div>
            <div className='quizQuestionsContainer'>
                <div className='quizQuestions' >
                    <input type="text" placeholder="שאלה" className="question-input" value={answer['question']} onChange={handleChange} />
                    <img className='selectImageQutionsSvg' src={Selectimage} />
                </div>
                <div className="answer-container">
                    <FormControl>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            name="radio-buttons-group"
                        >
                            {answersArr.map((item, index: number) =>
                                <MakeQuestion key={index} questionNum={index + 1} setAnswer={setAnswer} answer={answer} />
                            )}
                        </RadioGroup>
                    </FormControl>

                </div>
                <div className="add-answer-contanier">
                    <button onClick={addAnswer} className="add-answer-btn">
                        <img src={AddAnswer} className="add-answer-svg" /> הוספת תשובה
                    </button>
                </div>
                <div className="hr-line"></div>
                <div className="footer-container-questions-btn">
                    <button className="duplicate-btn">
                        <img src={duplicateSvg} className="duplicate-svg" />
                    </button>
                    <button className="trash-btn">
                        <img src={TrashSvg} className="trash-svg" />
                    </button>
                </div>
            </div>
        </div>
    )
};


export default AddQutionsBox;