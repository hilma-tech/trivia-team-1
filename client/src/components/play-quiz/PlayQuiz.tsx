import React, { useState, useEffect, useMemo, useContext, useRef } from "react";
import { useMediaQuery } from "@mui/material";
import fullScreenIcon from "../../images/question-template/full-screen.png";
import "../../style/questionTemp.scss";
import { useNavigate, useParams } from "react-router-dom";
import { usePopContext } from "../popups/popContext";
import { usePlayerName } from "../../context/PlayerNameContext";
import { PopUpType } from "../popups/GenericPopParts";
import PhonePageWithNav from "../navbar/phonePageWithNav";
import axios from "axios";

interface AnswerFromServer {
  text: string;
  imageUrl: string;
  isCorrect: boolean;
}

interface QuestionFromServer {
  title: string;
  imageUrl: string;
  answers: AnswerFromServer[];
}

const QuestionTemp = () => {
  const { playerName, setPlayerName } = usePlayerName();
  const [questions, setQuestions] = useState<QuestionFromServer[]>([]);
  const [quizTitle, setQuizTitle] = useState("")
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scoreRecWidth, setScoreRecWidth] = useState(30);
  const [quantityOfQuestion, setQuantityOfQuestion] = useState(10);

  const [greenIndex, setGreenIndex] = useState<number | undefined>();
  const [redIndex, setRedIndex] = useState<number | undefined>();
  const [fullScreenIndex, setFullScreenIndex] = useState<number | undefined>();
  const [score, setScore] = useState(0);

  const [changeFlexDir, setChangeFlexDir] = useState(true);
  const isLargeScreen = useMediaQuery("(min-width: 600px)");
  const { popHandleClickOpen, setPopType, setNumOfQuestions, setCorrectAnswers, correctAnswers } = usePopContext();
  const { quizId } = useParams();

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
  }, [currentQuestionIndex, currentQuestion]);

  useEffect(() => {
    calcWidthOfRec();
  }, [quantityOfQuestion, currentQuestionIndex]);

  const setInfoFromServer = async () => {
    const response = await axios.get(`http://localhost:8080/api/quiz/${quizId}`);
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
    postScore()
    setNumOfQuestions(quantityOfQuestion);
    setCurrentQuestionIndex(0);
    if (isLargeScreen) navigate("/:userName/quiz/:quizId/finished-game-pc");
    else {
      setPopType(PopUpType.FinishedQuiz);
      popHandleClickOpen();
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


  const checkIfCorrect = (index: number) => {
    if (currentQuestion?.answers[index]?.isCorrect) {
      setScore((prev) => prev + 1);
    }
    if (currentQuestion.answers[index].isCorrect) {
      setCorrectAnswers((prev) => prev + 1);
      timer.current = setTimeout(moveToNextQuestion, 500);
    } else {
      makeCorrectAnswerGreen();
      makeAnswerRed(index);
      timer.current = setTimeout(moveToNextQuestion, 500);
    }
  };

  const resizeFull = (e: React.MouseEvent<HTMLDivElement>, index: number): void => {
    e.stopPropagation();
    setFullScreenIndex(index);
  };
  const resizeShrink = (e: React.MouseEvent<HTMLDivElement>, index: number): void => {
    e.stopPropagation();
    setFullScreenIndex(undefined);
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
              {answer?.imageUrl ? (
                <div className="image-container">
                  {!isLargeScreen && (
                    <div className="icon-div" onClick={(e) => resizeFull(e, index)}>
                      <img src={fullScreenIcon} alt="fullScreenIcon" />
                    </div>
                  )}
                  <div
                    className={fullScreenIndex === index ? "question-img-div .full-screen" : "question-img-div"}
                    onClick={(e) => {
                      if (fullScreenIndex === index) resizeShrink(e, index);
                    }}
                  >
                    <img
                      className="button-img"
                      src={`${answer?.imageUrl}`}
                      alt="picture of answer"
                    />
                  </div>
                </div>
              ) : null}
            </button>
          </div>
        ))
        }
      </>
    );
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
                    className="question-img img"
                    src={`${currentQuestion?.imageUrl}`}
                    alt="pic of something that connected to the question"
                  />}
                </div>
                <h2 className="question-title">{currentQuestion?.title}</h2>
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
              <div className="question-place-child">
                <div className="question-img-place">
                  {currentQuestion?.imageUrl && <img
                    className="question-img img"
                    src={`${currentQuestion?.imageUrl}`}
                    alt="pic of something that connected to the question"
                  />}
                </div>
                <h2 className="question-title">{currentQuestion?.title}</h2>
                <hr id="hr" />
                <div className={changeFlexDir ? "button-place-one" : "button-place-two"}>
                  <AnswersMap />
                </div>
              </div>
            </div>
          </div>
        </main>
      </PhonePageWithNav>
  );
};




export default QuestionTemp;
