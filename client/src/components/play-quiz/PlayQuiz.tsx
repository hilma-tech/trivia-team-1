import React, { useState, useEffect, useMemo, useContext, useRef } from "react";
import { useMediaQuery } from "@mui/material";
import fullScreenIcon from "../../images/question-template/full-screen.png";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { usePopContext } from "../popups/popContext";
import { usePlayerName } from "../../context/PlayerNameContext";
import { PopUpType } from "../popups/GenericPopParts";
import PhonePageWithNav from "../navbar/phonePageWithNav";

import { AnswersMap } from "./AnswersMap";
import { launchPageAnimation } from "../../common/functions/LaunchPageAnimation";
import "../../style/questionTemp.scss";

interface AnswerFromServer {
  text: string;
  imageUrl: string;
  isCorrect: boolean;
}

export interface QuestionFromServer {
  title: string;
  imageUrl: string;
  answers: AnswerFromServer[];
}

const QuestionTemp = () => {
  const { setQuizId, playerName, setPlayerName } = usePlayerName();
  const [questions, setQuestions] = useState<QuestionFromServer[]>([]);
  const [quizTitle, setQuizTitle] = useState("")
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scoreRecWidth, setScoreRecWidth] = useState(30);
  const [quantityOfQuestion, setQuantityOfQuestion] = useState(10);
  const [didClickOnce, toggleDidClickOnce] = useState<boolean>(false);
  const [animationOpacity, setAnimationOpacity] = useState<boolean>(true);

  const [greenIndex, setGreenIndex] = useState<number | undefined>();
  const [redIndex, setRedIndex] = useState<number | undefined>();
  const [fullScreenIndex, setFullScreenIndex] = useState<number | undefined>();
  const [score, setScore] = useState(0);

  const [changeFlexDir, setChangeFlexDir] = useState(true);
  const isLargeScreen = useMediaQuery("(min-width: 600px)");
  const { popHandleClickOpen, setPopType, setNumOfQuestions, setCorrectAnswers, correctAnswers } = usePopContext();
  const { userName, quizId } = useParams();
  const animationClassExpression = animationOpacity ? 'opacity-on ' : ''

  const navigate = useNavigate();

  const currentQuestion = questions[currentQuestionIndex];

  let timer = useRef<null | NodeJS.Timeout>(null);

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
    launchPageAnimation(setAnimationOpacity);
    setCorrectAnswers(0);
    if (playerName === "") {
      window.history.back()
    }
    if (!quizId) window.history.back()
    else {
      setQuizId(Number(quizId));
    }
    setInfoFromServer();
    if (!questions) {
      navigateToEndGameScreen();
    }
    if (timer.current != null) {
      clearTimeout(timer.current);
    }
  }, []);

  useEffect(() => {
    checkIfThereAreImg();
    toggleDidClickOnce(false);
  }, [currentQuestionIndex, currentQuestion]);

  useEffect(() => {
    calcWidthOfRec();
  }, [quantityOfQuestion, currentQuestionIndex]);

  const setInfoFromServer = async () => {
    const response = await axios.get(`/api/quiz/${quizId}`);
    if (!response.data) return navigate("/error404");
    setQuestions(response.data.questions);
    setQuantityOfQuestion(response.data.questions.length);
    setQuizTitle(response.data.title);
  };

  const calcWidthOfRec = () => {
    let divWidth;
    isLargeScreen ? divWidth = 68.75 : divWidth = 100;

    let numToPushToState = (divWidth / quantityOfQuestion) * (currentQuestionIndex + 1);
    setScoreRecWidth(numToPushToState);
  };

  const postScore = async () => {
    const finalScore = Math.round(correctAnswers / questions.length * 100)
    axios.post(`/api/quiz/${quizId}/scores`, {
      score: finalScore,
      player: playerName
    })
  }

  const navigateToEndGameScreen = () => {
    setNumOfQuestions(quantityOfQuestion);
    setCurrentQuestionIndex(0);
    if (isLargeScreen) navigate(`/quiz/${quizId}/finished-game-pc`);
    else {
      setPopType(PopUpType.FinishedQuiz);
      popHandleClickOpen();
    }
  };

  const makeOpacity = () => {
    setTimeout(() => {
      setAnimationOpacity(true);
    }, 500)
    setTimeout(() => {
      setAnimationOpacity(false);
    }, 1200)
  }

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
    }
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

  const resizeFull = (e: React.MouseEvent<HTMLDivElement>, index: number): void => {
    e.stopPropagation();
    setFullScreenIndex(index);
  };
  const resizeShrink = (e: React.MouseEvent<HTMLDivElement>, index: number): void => {
    e.stopPropagation();
    setFullScreenIndex(undefined);
  };

  return (
    isLargeScreen ?
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
                    className={(animationClassExpression) + `question-img img`}
                    src={`${currentQuestion?.imageUrl}`}
                    alt="pic of something that connected to the question"
                  />}
                </div>
                <h2 className={`question-title ${(animationClassExpression)}`}>{currentQuestion?.title}</h2>
                <hr id="hr" className={(animationClassExpression)} />
                <div className={(animationClassExpression) + (changeFlexDir ? "button-place-one" : "button-place-two")}>
                  <AnswersMap
                    currentQuestion={currentQuestion}
                    changeFlexDir={changeFlexDir}
                    redIndex={redIndex}
                    greenIndex={greenIndex}
                    checkIfCorrect={checkIfCorrect}
                    isLargeScreen={isLargeScreen}
                    resizeFull={resizeFull}
                    fullScreenIcon={fullScreenIcon}
                    fullScreenIndex={fullScreenIndex}
                    resizeShrink={resizeShrink}
                  />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      :
      <PhonePageWithNav type="return" title={quizTitle} className="question-temp comp-children-container">
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
              <div className='question-place-child'>
                <div className="question-img-place">
                  {currentQuestion?.imageUrl && <img
                    className={animationClassExpression + "question-img img"}
                    src={`${currentQuestion?.imageUrl}`}
                    alt="pic of something that connected to the question"
                  />}
                </div>
                <h2 className={`question-title ${(animationClassExpression)}`}>{currentQuestion?.title}</h2>
                <hr id="hr" className={animationClassExpression} />
                <div className={animationClassExpression + (changeFlexDir ? "button-place-one" : "button-place-two")}>
                  <AnswersMap
                    currentQuestion={currentQuestion}
                    changeFlexDir={changeFlexDir}
                    redIndex={redIndex}
                    greenIndex={greenIndex}
                    checkIfCorrect={checkIfCorrect}
                    isLargeScreen={isLargeScreen}
                    resizeFull={resizeFull}
                    fullScreenIcon={fullScreenIcon}
                    fullScreenIndex={fullScreenIndex}
                    resizeShrink={resizeShrink}
                  />
                </div>
              </div>
            </div>
          </div>
        </main>
      </PhonePageWithNav>
  );
};




export default QuestionTemp;