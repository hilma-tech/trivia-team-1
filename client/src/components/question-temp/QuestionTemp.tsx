import React, { useState, useEffect, useMemo } from 'react';
import { useMediaQuery } from '@mui/material';
import fullScreenIcon from '../../images/question-template/full-screen.png';
import '../../style/questionTemp.scss'
import { useNavigate } from 'react-router-dom';
import { usePopContext } from '../popups/popContext';
import { Type } from '../popups/GenericPopParts';
import axios from 'axios';


interface QuestionTempState {
    answers: {
        ans: string,
        url: string,
        isCorrect: boolean
    }[][],
    question: {
        questionTitle: string,
        url: string
    }[],
}

interface stateObj {
    [key: string]: boolean;
}

interface AnswerFromServer {
    text: string;
    url: string;
    isCorrect: boolean;
}

interface QuestionFromServer {
    questionTitle: string;
    url: string;
    answers: AnswerFromServer[];
}

const QuestionTemp = () => {
    const [questions, setQuestions] = useState<QuestionFromServer[]>([
        {
            questionTitle: "איטליה מכונה גם...", url: "https://upload.wikimedia.org/wikipedia/he/e/e3/%D7%9E%D7%93%D7%99%D7%A0%D7%AA_%D7%94%D7%92%D7%9E%D7%93%D7%99%D7%9D.jpg",
            answers: [
                { text: "ארץ המגף", url: "https://img.mako.co.il/2021/07/07/GettyImages-51246878_re_autoOrient_i.jpg", isCorrect: true },
                { text: "התפוח הגדול", url: "sdvsdv", isCorrect: false },
                { text: "ארץ האגדות", url: "awvev", isCorrect: false },
                { text: "מדינת הגמדים", url: "dvdsv", isCorrect: false }
            ]
        },
        {
            questionTitle: "?מי מהבאים היה איטלקי", url: "https://upload.wikimedia.org/wikipedia/he/e/e3/%D7%9E%D7%93%D7%99%D7%A0%D7%AA_%D7%94%D7%92%D7%9E%D7%93%D7%99%D7%9D.jpg", answers: [
                { text: "לאונרדו דה וינצ'י", url: "", isCorrect: true },
                { text: "נועה קירל", url: "", isCorrect: false },
                { text: "שפע יששכר", url: "", isCorrect: false },
                { text: "לאונרד הכהן", url: "", isCorrect: false }
            ]
        }
    ]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [scoreRecWidth, setScoreRecWidth] = useState(30);
    const [quantityOfQuestion, setQuantityOfQuestion] = useState(10);

    const [greenIndex, setGreenIndex] = useState<number | undefined>();
    const [redIndex, setRedIndex] = useState<number | undefined>();

    const [changeFlexDir, setChangeFlexDir] = useState(true);
    const isLargeScreen = useMediaQuery("(min-width: 600px)")
    const [isFullScreen, setIsFullScreen] = useState<stateObj>({ pic0: false, pic1: false, pic2: false, pic3: false });
    const { popHandleClickOpen, setPopType } = usePopContext();

    const navigate = useNavigate();

    const currentQuestion = questions[currentQuestionIndex];

    const checkIfThereAreImg = () => {
        for (let i = 0; i < currentQuestion.answers.length; i++) {
            if (currentQuestion.answers[i].url) {
                setChangeFlexDir(false);
            } else {
                setChangeFlexDir(true);
            }
        }
    }
    
    useEffect(checkIfThereAreImg, [currentQuestionIndex]);

    useEffect(() => {
        setInfoFromServer();
        checkIfThereAreImg();
    }, []);

    useEffect(() => {
        if (currentQuestionIndex === currentQuestion.answers.length - 1) {
            navigateToEndGameScreen();
        }
    }, [currentQuestionIndex])

    //TODO: use this
    const calcWidthOfRec = () => {
        let widthOfScreen = 82.5;
        let temp = widthOfScreen / quantityOfQuestion;
        let numToPushToState = temp * currentQuestionIndex;
        setScoreRecWidth(numToPushToState);
    }

    const setInfoFromServer: () => Promise<void> = async () => {
        // let copyQuestion = [...questions];
        const quizId = 2;
        const response = await axios.get(`http://localhost:8080/api/quiz/${quizId}`)
        console.log("response:", response.data);
        // copyQuestion = response.data[2];
        setQuestions(response.data.questions);
        // setQuantityOfQuestion(data.questions.length);
        // calcWidthOfRec();
    }

    const navigateToEndGameScreen = () => {
        setCurrentQuestionIndex(0);
        if (isLargeScreen) alert("HERE");
        else {
            setPopType(Type.FinishedQuiz);
            popHandleClickOpen();
        }
        //TODO: use this instead of alert
        // navigate('/quiz/:userName/:quizName/finished-game-pc')
    }

    const checkIfCorrect = (index: number) => {
        if (currentQuestion.answers[index].isCorrect) {
            setTimeout(moveToNextQuestion, 500);
        } else {
            makeCorrectAnswerGreen();
            makeAnswerRed(index);
            setTimeout(moveToNextQuestion, 500);
        }
    }

    const moveToNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            navigateToEndGameScreen();
        }
        setRedIndex(undefined);
        setGreenIndex(undefined);
    }

    const makeAnswerRed = (index: number) => {
        setRedIndex(index);
    }

    const makeCorrectAnswerGreen = () => {
        const correctAnswerIndex = currentQuestion.answers.findIndex((answer) => answer.isCorrect);
        setGreenIndex(correctAnswerIndex);
    }

    const resizeFull = (e: React.MouseEvent<HTMLDivElement>, picIndex: string): void => {
        e.stopPropagation()
        setIsFullScreen(prev => ({ ...prev, [picIndex]: !prev[picIndex] }))
    }
    const resizeShrink = (e: React.MouseEvent<HTMLDivElement>, picIndex: string): void => {
        e.stopPropagation();
        if (isFullScreen[picIndex] === false) return;
        setIsFullScreen(prev => ({ ...prev, [picIndex]: false }))
    }


    const renderMap = () => {
        return currentQuestion.answers.map((answer, index: number) => {
            let picIndex = `pic${index}`
            return (
                <>
                    <button
                        className={!currentQuestion.answers[0].url ? 'ans-button-no-img' : 'ans-button-with-img'}
                        key={index}
                        style={{ backgroundColor: redIndex === index ? '#F28787' : greenIndex === index ? '#80DCC9' : '#0C32490A' }}
                        onClick={() => checkIfCorrect(index)}
                    >
                        <div>
                            <p className='answer-button'>{answer.text}</p>
                        </div>
                        {answer.url ?
                            <div className='div-imgs'>
                                {!isLargeScreen &&
                                    <div className='icon-div' onClick={(e) => resizeFull(e, picIndex)}>
                                        <img src={fullScreenIcon} alt='fullScreenIcon' />
                                    </div>
                                }
                                <div
                                    className={`img-div ${isFullScreen[picIndex] ? `full-screen` : ''}`}
                                    onClick={(e) => resizeShrink(e, picIndex)}
                                >
                                    <img
                                        className='button-img'
                                        src={`${answer.url}`}
                                        alt=""
                                    />
                                </div>
                            </div>
                            : null}
                    </button>
                </>
            )
        })
    }

    return (
        <div className='question-temp comp-children-container'>
            <main className='main-QuastionTemp'>
                <div
                    className='score-rectangle' style={{ width: `${scoreRecWidth}rem` }}>
                </div>
                <div className='numOfQuestion-place'>
                    <div className='numOfQuestion'>
                        <p>
                            שאלה {quantityOfQuestion}/{currentQuestionIndex}
                        </p>
                    </div>
                </div>
                <div className='question-content'>
                    <div className='question-place-father'>
                        <div className='question-place-child'>
                            <div className='question-img-place'>
                                <img className='question-img img' src={`${currentQuestion.url}`}
                                    alt="pic of something that connected to the question"
                                />
                            </div>
                            <h2 id='questionTitle'>
                                {currentQuestion.questionTitle}
                            </h2>
                            <hr id='hr' />
                            <div className={changeFlexDir ?
                                'button-place-one'
                                :
                                'button-place-two'}
                            >
                                {renderMap()}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default QuestionTemp;
