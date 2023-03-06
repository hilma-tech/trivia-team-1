<<<<<<< HEAD
import React, { FC, useState, useEffect } from "react";
=======
import React, { FC} from "react";
>>>>>>> c82d01948bc0ee6b901faf93a12210f50aad67c4
import Selectimage from '../../images/image.svg'
import NewAnswer from './NewAnswer'
import AddAnswer from '../../images/addAnswer.svg'
import duplicateSvg from '../../images/copy.svg'
import TrashSvg from '../../images/trash.svg'
<<<<<<< HEAD
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
=======
import dragAndDropSvg from '../../images/drag-and-drop.svg'
import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';
import { CurrentQuestion } from '../../utils/Interfaces'
import { useQuestionContext } from "../../context/AnswersContext";
import BootstrapTooltip from "../../tooltip/tooltip";



interface AddQuestionBoxProps {
    setCurrentQuestion: React.Dispatch<React.SetStateAction<CurrentQuestion>>;
    currentQuestion: CurrentQuestion;
    setCurrentEditQuestion : React.Dispatch<React.SetStateAction<number>>
    duplicateQuestion:() => void
    currentEditQuestion : number;

>>>>>>> c82d01948bc0ee6b901faf93a12210f50aad67c4

}


<<<<<<< HEAD
const AddQuestionBox: FC<Props> = ({ setCurrentQuestion, currentQuestion, questionId }) => {


    // const [answersArr, setAnswersArr] = useState<number[]>([1, 1]);

    const isMobile = useMediaQuery('(max-width:600px)');
=======
const AddQuestionBox: FC<AddQuestionBoxProps> = ({ setCurrentQuestion, currentQuestion , setCurrentEditQuestion , duplicateQuestion , currentEditQuestion}) => {

    const { setQuestions, questions } = useQuestionContext()

>>>>>>> c82d01948bc0ee6b901faf93a12210f50aad67c4

    const addAnswer = () => {
        if (currentQuestion.answers.length < 4) {
            setCurrentQuestion(prevState => ({
                ...prevState,
<<<<<<< HEAD
                answers: [...prevState.answers, '']
=======
                answers: [...prevState.answers, {text: '' , isCorrect:false , imageUrl: '' }]
>>>>>>> c82d01948bc0ee6b901faf93a12210f50aad67c4
            }));
        }
    }

<<<<<<< HEAD
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        let copy = { ...currentQuestion };
        console.log(copy)
        copy.questionTitle = e.target.value;
        setCurrentQuestion(copy);
=======

    const deleteQuestion = () => {
        let deleteIndex = questions.findIndex(question => question.questionId === currentQuestion.questionId)
        console.log('deleteIndex: ', deleteIndex);
        setQuestions(prevState => {
           return prevState.filter((question ,index) => index!== deleteIndex);
           
        })
        setCurrentEditQuestion(questions.length - 2)

    }

    

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setCurrentQuestion((prev) => {
            return { ...prev, title: e.target.value }
        });
>>>>>>> c82d01948bc0ee6b901faf93a12210f50aad67c4

    }


    return (
<<<<<<< HEAD

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
=======
        <div className='add-questions-container' > 
            <div className='darg-and-drop-container'>
                <BootstrapTooltip title="שינוי סדר השאלות">
                    <img className='drag-and-drop-svg' src={dragAndDropSvg} alt='drag button to switch question place' />
                </BootstrapTooltip>
            </div>

            <div className='quiz-questions-container'>
                <div className='quiz-questions' >
                    <BootstrapTooltip title="שינוי שם">
                        <input type="text" placeholder="שאלה" className="question-input" value={currentQuestion.title} onChange={handleChange} />
                    </BootstrapTooltip>
                    <BootstrapTooltip title="הוספת תמונה לשאלה">
                        <img className='select-image-questions-svg' src={Selectimage} alt='add here to the question' />
                    </BootstrapTooltip>

                </div>
                <div className="answer-container">
                    <FormControl>
                        <RadioGroup
>>>>>>> c82d01948bc0ee6b901faf93a12210f50aad67c4
                            name="radio-buttons-group"
                        >

                            {currentQuestion.answers.map((answer, index) => (
<<<<<<< HEAD
                                <NewAnswer key={index} answerIndex={index} setCurrentQuestion={setCurrentQuestion} currentQuestion={currentQuestion} />
=======
                                <NewAnswer key={index} answerIndex={index} setCurrentQuestion={setCurrentQuestion} currentQuestion={currentQuestion} currentEditQuestion={currentEditQuestion} />
>>>>>>> c82d01948bc0ee6b901faf93a12210f50aad67c4
                            ))}
                        </RadioGroup>
                    </FormControl>

                </div>
<<<<<<< HEAD
                <div className="add-answer-contanier">
                    <button onClick={addAnswer} className="add-answer-btn">
                        <img src={AddAnswer} className="add-answer-svg" /> הוספת תשובה
=======
                <div className="add-answer-container">
                    <button onClick={addAnswer} className="add-answer-btn">
                        <img src={AddAnswer} className="add-answer-svg" alt='add answer to your question' /> הוספת תשובה
>>>>>>> c82d01948bc0ee6b901faf93a12210f50aad67c4
                    </button>
                </div>
                <div className="hr-line"></div>
                <div className="footer-container-questions-btn">
<<<<<<< HEAD
                    <button className="duplicate-btn">
                        <img src={duplicateSvg} className="duplicate-svg" />
                    </button>
                    <button className="trash-btn">
                        <img src={TrashSvg} className="trash-svg" />
                    </button>
=======

                    <BootstrapTooltip title="שכפול">
                        <button className="duplicate-btn" onClick={duplicateQuestion}>
                            <img src={duplicateSvg} className="duplicate-svg" alt='duplicate your question' />
                        </button>
                    </BootstrapTooltip>
                    <BootstrapTooltip title="מחיקה">
                        <button className="trash-btn" onClick={deleteQuestion}>
                            <img src={TrashSvg} className="trash-svg" alt='delete your question' />
                        </button>
                    </BootstrapTooltip>
>>>>>>> c82d01948bc0ee6b901faf93a12210f50aad67c4
                </div>
            </div>
        </div>
    )
};


export default AddQuestionBox;