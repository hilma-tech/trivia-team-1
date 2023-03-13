import React, { useState, useEffect, useMemo, useContext } from "react";
import "../../style/questionTemp.scss";
import { usePopContext } from "../popups/popContext";
import { useQuestionContext } from '../../context/AnswersContext'
import { SummaryGameDesktop } from "../popups/SummaryGameDesktop";



const DemoQuiz = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [scoreRecWidth, setScoreRecWidth] = useState(30);

    const [greenIndex, setGreenIndex] = useState<number | undefined>();
    const [redIndex, setRedIndex] = useState<number | undefined>();
    const [score, setScore] = useState(0);

    const [changeFlexDir, setChangeFlexDir] = useState(true);
    const { popHandleClickOpen, setPopType, setNumOfQuestions, setCorrectAnswers, correctAnswers } = usePopContext();
    const { setQuestions, questions } = useQuestionContext();
    const [toggleEndGame, setToggleEndGame] = useState(true);

    const quantityOfQuestion = questions.length
    const currentQuestion = questions[currentQuestionIndex];

    const checkIfThereAreImg = () => {
        for (let i = 0; i < currentQuestion?.answers?.length; i++) {
            if (currentQuestion?.answers[i]?.imageUrl) {
                setChangeFlexDir(false);
                break;
            } else {
                setChangeFlexDir(true);
            }
        }
    };

    useEffect(() => {
        checkIfThereAreImg();
    }, [currentQuestionIndex, currentQuestion]);

    useEffect(() => {
        calcWidthOfRec();
    }, [quantityOfQuestion, currentQuestionIndex]);



    const calcWidthOfRec = () => {
        let divWidth = 68.75;
        let numToPushToState = (divWidth / quantityOfQuestion) * (currentQuestionIndex + 1);
        setScoreRecWidth(numToPushToState);
    };

    const navigateToEndGameScreen = () => {
        setNumOfQuestions(quantityOfQuestion);
        setCurrentQuestionIndex(0);
        setToggleEndGame(!toggleEndGame);        
    };
    const moveToNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex((prev) => prev + 1);
        }
        else {
            navigateToEndGameScreen();
        }
        setRedIndex(undefined);
        setGreenIndex(undefined);
    };

    const makeAnswerRed = (index: number) => {
        setRedIndex(index);
    };

    const makeCorrectAnswerGreen = () => {
        const correctAnswerIndex = currentQuestion?.answers?.findIndex((answer) => answer.isCorrect);
        setGreenIndex(correctAnswerIndex);
    };


    const checkIfCorrect = (index: number) => {
        if (currentQuestion?.answers[index]?.isCorrect) {
            setScore((prev) => prev + 1);
        }
        if (currentQuestion.answers[index].isCorrect) {
            setCorrectAnswers((prev) => prev + 1);
            setTimeout(moveToNextQuestion, 500);
        } else {
            makeCorrectAnswerGreen();
            makeAnswerRed(index);
            setTimeout(moveToNextQuestion, 500);
        }
    };

    const AnswersMap = () => {
        return (
            <>
                {currentQuestion?.answers?.map((answer, index) => (
                    <div key={`current-answer-${index}`}>
                        <button
                            className={
                                changeFlexDir ? "ans-button-no-img" : "ans-button-with-img"
                            }
                            key={index}
                            style={{
                                backgroundColor:
                                    redIndex === index ? "#F28787" : greenIndex === index ? "#80DCC9" : "#0C32490A",
                            }}
                            onClick={() => {
                                checkIfCorrect(index);
                            }}
                        >
                            <div>
                                <p className="answer-button">{answer.text}</p>
                            </div>
                            <img
                                className="button-img"
                                src={`${answer?.imageUrl}`}
                                alt={answer.imageUrl ? "picture of answer" : ""}
                            />
                        </button>
                    </div>
                ))
                }
            </>
        );
    };

    return (
        toggleEndGame ?
        <div className="question-temp comp-children-container">
            <main className="main-question-temp">
                <div className="score-rectangle" style={{ width: `${scoreRecWidth}vw` }}></div>
                <div className="num-of-question-place">
                    <div className="num-of-question">
                        <p>
                            שאלה {quantityOfQuestion}/{currentQuestionIndex + 1}
                        </p>
                    </div>
                </div>
                <div className="question-content">
                    <div className="question-place-father">
                        <div className="question-place-child">
                            <div className="question-img-place">
                                {currentQuestion?.imageUrl && <img
                                    className="question-img img"
                                    src={`${currentQuestion?.imageUrl}`}
                                    alt="pic of something that connected to the question"
                                />}
                            </div>
                            <h2 id="question-title">{currentQuestion?.title}</h2>
                            <hr id="hr" />
                            <div className={changeFlexDir ? "button-place-one" : "button-place-two"}>
                                <AnswersMap />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
        :
        <SummaryGameDesktop/>
    );
};




export default DemoQuiz;
