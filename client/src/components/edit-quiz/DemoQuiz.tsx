import React, { useState, useEffect, useMemo, useContext } from "react";
import { AnswersMap } from "../play-quiz/AnswersMap";
import { usePopContext } from "../popups/popContext";
import { useQuestionContext } from '../../context/AnswersContext'
import { SummaryGameDesktop } from "../popups/SummaryGameDesktop";
import { parseImageSrc } from '../../common/functions/parseImageSrc';
import selectImage from '../../images/image.svg';
import { useMediaQuery } from "@mui/material";
import fullScreenIcon from "../../images/question-template/full-screen.png";
import "../../style/questionTemp.scss";




const DemoQuiz = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [scoreRecWidth, setScoreRecWidth] = useState(30);
    const isLargeScreen = useMediaQuery("(min-width: 600px)");
    const [didClickOnce, toggleDidClickOnce] = useState<boolean>(false);


    const [fullScreenIndex, setFullScreenIndex] = useState<number | undefined>();
    const [greenIndex, setGreenIndex] = useState<number | undefined>();
    const [redIndex, setRedIndex] = useState<number | undefined>();
    const [animationOpacity, setAnimationOpacity] = useState<boolean>(false);

    const [score, setScore] = useState(0);
    const [isThereImg, setIsThereImg] = useState(true);
    const { popHandleClickOpen, setPopType, setNumOfQuestions, setCorrectAnswers, correctAnswers } = usePopContext();
    const { setQuestions, questions } = useQuestionContext();
    const [toggleEndGame, setToggleEndGame] = useState(true);
    const quantityOfQuestion = questions.length
    const currentQuestion = questions[currentQuestionIndex];
    const animationClassExpression = animationOpacity ? 'opacity-on ' : ''


    useEffect(() => {
        checkIfThereAreImg();
        toggleDidClickOnce(false);
    }, [currentQuestionIndex, currentQuestion]);
    

    const checkIfThereAreImg = () => {
        for (let i = 0; i < currentQuestion?.answers?.length; i++) {
            if (parseImageSrc(currentQuestion?.answers[i]?.imageUrl) !== selectImage) {
                setIsThereImg(false);
                break;
            } else {
                setIsThereImg(true);
            }
        }
    };

    const calcWidthOfRec = () => {
        let divWidth = 68.75;
        let numToPushToState = (divWidth / quantityOfQuestion) * (currentQuestionIndex + 1);
        setScoreRecWidth(numToPushToState);
    };

    const resizeFull = (e: React.MouseEvent<HTMLDivElement>, index: number): void => {
        e.stopPropagation();
        setFullScreenIndex(index);
    };
    const resizeShrink = (e: React.MouseEvent<HTMLDivElement>, index: number): void => {
        e.stopPropagation();
        setFullScreenIndex(undefined);
    };

    const makeOpacity = () => {
        setTimeout(() => {
            setAnimationOpacity(true);
        }, 500)
        setTimeout(() => {
            setAnimationOpacity(false);
        }, 1200)
    }

    const setCheckIfThereAreImgInChange = useMemo(() => {
        return checkIfThereAreImg()
    }, [currentQuestionIndex, currentQuestion])

    const setCalcWidthOfRecInChange = useMemo(() => {
        return calcWidthOfRec()
    }, [quantityOfQuestion, currentQuestionIndex])

    const moveToNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex((prev) => prev + 1);
        }
        else {
            setCurrentQuestionIndex(0)
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
        if (!didClickOnce) {
            if (currentQuestion.answers[index].isCorrect) {
                makeCorrectAnswerGreen();
                setCorrectAnswers((prev) => prev + 1);
                setTimeout(moveToNextQuestion, 1000);
            } else {
                makeCorrectAnswerGreen();
                makeAnswerRed(index);
                setTimeout(moveToNextQuestion, 1000);
            }
            toggleDidClickOnce(true);
            makeOpacity();
        };
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
                                    {parseImageSrc(currentQuestion?.imageUrl) !== selectImage && <img
                                        className={(animationClassExpression) + `question-img img`}
                                        src={parseImageSrc(currentQuestion?.imageUrl)}
                                        alt="pic of something that connected to the question"
                                    />}
                                </div>
                                <h2 className={`question-title ${(animationClassExpression)}`}>{currentQuestion?.title}</h2>
                                <hr id="hr" className={(animationClassExpression)}/>
                                <div className={animationClassExpression + (isThereImg ? "button-place-one" : "button-place-two")}>
                                    <AnswersMap
                                        currentQuestion={currentQuestion}
                                        changeFlexDir={isThereImg}
                                        redIndex={redIndex}
                                        greenIndex={greenIndex}
                                        checkIfCorrect={checkIfCorrect}
                                        isLargeScreen={isLargeScreen}
                                        resizeFull={resizeFull}
                                        fullScreenIcon={fullScreenIcon}
                                        fullScreenIndex={fullScreenIndex}
                                        resizeShrink={resizeShrink} />
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            :
            <SummaryGameDesktop />
    );
};




export default DemoQuiz;
