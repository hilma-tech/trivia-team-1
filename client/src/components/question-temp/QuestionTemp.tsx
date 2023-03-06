import React, { useState, useEffect, useMemo } from 'react';
import { useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { usePopContext } from '../popups/popContext';
import { Type } from '../popups/GenericPopParts';
import fullScreenIcon from '../../images/question-template/full-screen.png';
import '../../style/questionTemp.scss'
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

const QuestionTemp = () => {

    const [answers, setAnswers] = useState<QuestionTempState["answers"]>([[
        { ans: "ארץ המגף", url: "https://img.mako.co.il/2021/07/07/GettyImages-51246878_re_autoOrient_i.jpg", isCorrect: true },
        { ans: "התפוח הגדול", url: "sdvsdv", isCorrect: false },
        { ans: "ארץ האגדות", url: "awvev", isCorrect: false },
        { ans: "מדינת הגמדים", url: "dvdsv", isCorrect: false }
    ], [
        { ans: "לאונרדו דה וינצ'י", url: "", isCorrect: true },
        { ans: "נועה קירל", url: "", isCorrect: false },
        { ans: "שפע יששכר", url: "", isCorrect: false },
        { ans: "לאונרד הכהן", url: "", isCorrect: false }
    ]
    ]);
    const [question, setQuestion] = useState<QuestionTempState["question"]>([
        {
            questionTitle: "איטליה מכונה גם...", url: "https://upload.wikimedia.org/wikipedia/he/e/e3/%D7%9E%D7%93%D7%99%D7%A0%D7%AA_%D7%94%D7%92%D7%9E%D7%93%D7%99%D7%9D.jpg"
        }
        ,
        {
            questionTitle: "?מי מהבאים היה איטלקי", url: "https://upload.wikimedia.org/wikipedia/he/e/e3/%D7%9E%D7%93%D7%99%D7%A0%D7%AA_%D7%94%D7%92%D7%9E%D7%93%D7%99%D7%9D.jpg"
        }
    ]);
    const [numOfQuestion, setNumOfQuestion] = useState(0);
    const [scoreRecWidth, setScoreRecWidth] = useState(30);
    const [quantityOfQuestion, setQuantityOfQuestion] = useState(10);
    const [changeColorToGreen, setChangeColorToGreen] = useState<number>(1000);
    const [changeColorToRed, setChangeColorToRed] = useState<number>(1000);
    const [changeFlexDir, setChangeFlexDir] = useState(true);
    const isLargeScreen = useMediaQuery("(min-width: 600px)")
    const [isFullScreen, setIsFullScreen] = useState<stateObj>({ pic0: false, pic1: false, pic2: false, pic3: false });
    const { popHandleClickOpen, setPopType } = usePopContext();
    const navigate = useNavigate();

    useEffect(() => {
        setInfoFromServer();
        checkIfThereAreImg();
    }, []);

    useEffect(() => {
        if (numOfQuestion === answers.length - 1) {
            postScore();
            navigateToEndGameScreen();

        }


    }, [numOfQuestion])

    const getActualQuestion = () => {
        return question[numOfQuestion]
    }

    const getActualAnswer = () => {
        return answers[numOfQuestion]
    }
    const checkIfThereAreImg = () => {
        for (let i = 0; i < actualAnswer.length; i++) {
            if (actualAnswer[i].url) {
                setChangeFlexDir(false);
            } else {
                setChangeFlexDir(true);
            }
        }
    }

    const actualQuestion = useMemo(() => getActualQuestion(), [numOfQuestion]);
    const actualAnswer = useMemo(() => getActualAnswer(), [numOfQuestion]);
    const doChangeFlexDir = useMemo(() => checkIfThereAreImg(), [numOfQuestion]);

    const setInfoFromServer: () => Promise<void> = async () => {
        let copyAnswers = [...answers];
        let copyQuestion = [...question];
        await fetch(`#`)
            .then((res) => res.json)
            .then((data) => {
                // copyAnswers = data.answers;
                // copyQuestion = data.questions;
                // setAnswers(copyAnswers);
                // setQuestion(copyQuestion);
                // setQuantityOfQuestion(data.questions.length);
                // calcWidthOfRec();
            })
            .catch((err) => {
                console.log(err, "catch");
            })
    }

    const navigateToEndGameScreen = () => {
        setNumOfQuestion(0);
        let url = window.location.href;
        if (isLargeScreen) navigate('/quiz/:userName/:quizName/finished-game-pc');
        else {
            setPopType(Type.FinishedQuiz);
            popHandleClickOpen();
        }
    }

    const calcWidthOfRec = () => {
        let widthOfScreen = 82.5;
        let temp = widthOfScreen / quantityOfQuestion;
        let numToPushToState = temp * numOfQuestion;
        setScoreRecWidth(numToPushToState);
    }

    const checkIfCorrect = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, index: number) => {
        if (actualAnswer[index].isCorrect) {
            console.log();
            setTimeout(mooveToNextQuestion, 500);
        } else {
            console.log("incorrect");
            // make the Question red or something
            funcForChangeColorToGreen();
            funcForChangeColorToRed(index);
            setTimeout(mooveToNextQuestion, 500);
        }
    }

    const mooveToNextQuestion = () => {
        let copyOfNumOfQuestion = numOfQuestion;
        if (copyOfNumOfQuestion < answers.length - 1) {
            copyOfNumOfQuestion++;
        }
        setNumOfQuestion(copyOfNumOfQuestion);
        setChangeColorToRed(10000);
        setChangeColorToGreen(10000);
    }

    const funcForChangeColorToRed = (index: number) => {
        let holderBool = index;
        setChangeColorToRed(holderBool);
    }

    const funcForChangeColorToGreen = () => {
        let correctAnsIndex: number;
        for (let i = 0; i < actualAnswer.length; i++) {
            if (actualAnswer[i].isCorrect) {
                correctAnsIndex = i;
                setChangeColorToGreen(correctAnsIndex);
                break;
            }
        }
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
    const postScore = async () => {
        let quizId = window.location.pathname.split('/')[3]//this will need to be fixed
        console.log('quizId: ', quizId);
        let playerName = sessionStorage.getItem('playerName') || 'סגייז';
        let { data } = await axios.post(`/api/quiz/${quizId}/scores`, {
            score: Math.floor(Math.random() * 101),
            player: playerName
        })
        console.log('data: ', data);
        console.log('playerName: ', playerName);
    }


    const renderMap = () => {
        return actualAnswer.map((answer, index: number) => {
            let picIndex = `pic${index}`
            return (
                <>

                    <button
                        className={!actualAnswer[0].url ? 'ans-button-no-img' : 'ans-button-with-img'}
                        key={index}
                        style={{ backgroundColor: changeColorToRed === index ? '#F28787' : changeColorToGreen === index ? '#80DCC9' : '#0C32490A' }}
                        onClick={(e) => checkIfCorrect(e, index)}
                    >
                        <div>
                            <p className='answer-button'>{answer.ans}</p>
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
                            שאלה {quantityOfQuestion}/{numOfQuestion}
                        </p>
                    </div>
                </div>
                <div className='question-content'>
                    <div className='question-place-father'>
                        <div className='question-place-child'>
                            <div className='question-img-place'>
                                <img className='question-img img' src={`${actualQuestion.url}`}
                                    alt="pic of something that connected to the question"
                                />
                            </div>
                            <h2 id='questionTitle'>
                                {actualQuestion.questionTitle}
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
