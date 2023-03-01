import React, { FC, useState, useEffect } from "react";
import Selectimage from '../../images/image.svg'
import NewAnswer from './NewAnswer'
import AddAnswer from '../../images/addAnswer.svg'
import duplicateSvg from '../../images/copy.svg'
import TrashSvg from '../../images/trash.svg'
import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';
import { CurrentQuestion } from './utils/Interfaces'
import AnswersProvider from "./context/AnswersContext";
import useMediaQuery from '@mui/material/useMediaQuery';
import { MobileHeader } from "./edit-quiz-mobile/editQuizParts";




interface Props {
    setCurrentQuestion: React.Dispatch<React.SetStateAction<CurrentQuestion>>;
    currentQuestion: CurrentQuestion;
    questionId: number;

}


const AddQuestionBox: FC<Props> = ({ setCurrentQuestion, currentQuestion, questionId }) => {


    // const [answersArr, setAnswersArr] = useState<number[]>([1, 1]);

    const isMobile = useMediaQuery('(max-width:600px)');

    const addAnswer = () => {
        if (currentQuestion.answers.length < 4) {
            setCurrentQuestion(prevState => ({
                ...prevState,
                answers: [...prevState.answers, '']
            }));
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        let copy = { ...currentQuestion };
        console.log(copy)
        copy.questionTitle = e.target.value;
        setCurrentQuestion(copy);

    }


    return (

        <div className='addQutionsContainer'>
            <div className='darganddropContainer'><button></button></div>
            <div className='quizQuestionsContainer'>
                {isMobile ? <MobileHeader handleChange={handleChange} questionId={questionId} currentQuestion={currentQuestion} /> :
                    (<div className="header-input-container">
                        <div className='quizQuestions' >
                            <input type="text" placeholder="שאלה" className="question-input" value={currentQuestion.questionTitle} onChange={handleChange} />
                            <img className='selectImageQutionsSvg' src={Selectimage} />
                        </div>
                    </div>)}

                <div className="answer-container">
                    <FormControl>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            name="radio-buttons-group"
                        >

                            {currentQuestion.answers.map((answer, index) => (
                                <NewAnswer key={index} answerIndex={index} setCurrentQuestion={setCurrentQuestion} currentQuestion={currentQuestion} />
                            ))}
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


export default AddQuestionBox;