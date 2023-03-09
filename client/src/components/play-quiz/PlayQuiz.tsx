import React, { useState, useEffect, useMemo } from "react";
import { useMediaQuery } from "@mui/material";
import fullScreenIcon from "../../images/question-template/full-screen.png";
import "../../style/questionTemp.scss";
import { useNavigate, useParams } from "react-router-dom";
import { usePopContext } from "../popups/popContext";
import { Type } from "../popups/GenericPopParts";
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
  const [questions, setQuestions] = useState<QuestionFromServer[]>([
    {
      title: "איטליה מכונה גם...",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/he/e/e3/%D7%9E%D7%93%D7%99%D7%A0%D7%AA_%D7%94%D7%92%D7%9E%D7%93%D7%99%D7%9D.jpg",
      answers: [
        {
          text: "ארץ המגף",
          imageUrl: "https://img.mako.co.il/2021/07/07/GettyImages-51246878_re_autoOrient_i.jpg",
          isCorrect: true,
        },
        { text: "התפוח הגדול", imageUrl: "", isCorrect: false },
        { text: "ארץ האגדות", imageUrl: "", isCorrect: false },
        { text: "מדינת הגמדים", imageUrl: "", isCorrect: false },
      ],
    },
  ]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scoreRecWidth, setScoreRecWidth] = useState(30);
  const [quantityOfQuestion, setQuantityOfQuestion] = useState(10);

  const [greenIndex, setGreenIndex] = useState<number | undefined>();
  const [redIndex, setRedIndex] = useState<number | undefined>();
  const [fullScreenIndex, setFullScreenIndex] = useState<number | undefined>();

  const [changeFlexDir, setChangeFlexDir] = useState(true);
  const isLargeScreen = useMediaQuery("(min-width: 600px)");
  const { popHandleClickOpen, setPopType } = usePopContext();
  const { quizId } = useParams();

  const navigate = useNavigate();

  const currentQuestion = questions[currentQuestionIndex];

  const checkIfThereAreImg = () => {
    for (let i = 0; i < currentQuestion.answers.length; i++) {
      if (currentQuestion.answers[i].imageUrl) {
        setChangeFlexDir(false);
        break;
      } else {
        setChangeFlexDir(true);
      }
    }
  };

  useEffect(() => {
    setInfoFromServer();
    checkIfThereAreImg();
  }, []);

  useEffect(() => {
    checkIfThereAreImg();
  }, [currentQuestionIndex]);

  useEffect(() => {
    console.log(currentQuestion)
    if (questions.length > 2) {
      if (currentQuestionIndex === questions.length -1 ) {
        navigateToEndGameScreen();
      }

    }
  }, [currentQuestionIndex]);

  useEffect(() => {
    calcWidthOfRec();
  }, [quantityOfQuestion, currentQuestionIndex]);

  const setInfoFromServer = async () => {
    const response = await axios.get(`http://localhost:8080/api/quiz/${quizId}`);

    if (!response.data) return navigate("/error404");

    setQuestions(response.data.questions);
    setQuantityOfQuestion(response.data.questions.length);
  };

  const calcWidthOfRec = () => {
    const divWidth = 68.75;
    let numToPushToState = (divWidth / quantityOfQuestion) * (currentQuestionIndex + 1);
    setScoreRecWidth(numToPushToState);
  };

  const navigateToEndGameScreen = () => {
    setCurrentQuestionIndex(0);
    if (isLargeScreen) navigate("/:userName/quiz/:quizId/finished-game-pc");
    else {
      setPopType(Type.FinishedQuiz);
      popHandleClickOpen();
    }
  };

  const checkIfCorrect = (index: number) => {
    if (currentQuestion.answers[index].isCorrect) {
      setTimeout(moveToNextQuestion, 500);
    } else {
      makeCorrectAnswerGreen();
      makeAnswerRed(index);
      setTimeout(moveToNextQuestion, 500);
    }
  };

  const moveToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } 
    // else {
    //   navigateToEndGameScreen();
    // }
    setRedIndex(undefined);
    setGreenIndex(undefined);
  };

  const makeAnswerRed = (index: number) => {
    setRedIndex(index);
  };

  const makeCorrectAnswerGreen = () => {
    const correctAnswerIndex = currentQuestion.answers.findIndex((answer) => answer.isCorrect);
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

  const AnswersMap = () => {
    return (
      <>
        {currentQuestion.answers.map((answer, index) => (
          <div key={`current-answer-${index}`}>
            <button
              className={
                !currentQuestion.answers[0].imageUrl ? "ans-button-no-img" : "ans-button-with-img"
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
              {answer.imageUrl ? (
                <div className="div-imgs">
                  {!isLargeScreen && (
                    <div className="icon-div" onClick={(e) => resizeFull(e, index)}>
                      <img src={fullScreenIcon} alt="fullScreenIcon" />
                    </div>
                  )}
                  <div
                    className={`img-div ${fullScreenIndex === index ? `full-screen` : ""}`}
                    onClick={(e) => {
                      if (fullScreenIndex === index) resizeShrink(e, index);
                    }}
                  >
                    <img
                      className="button-img"
                      src={`${answer.imageUrl}`}
                      alt="picture of answer"
                    />
                  </div>
                </div>
              ) : null}
            </button>
          </div>
        ))}
      </>
    );
  };

  return (
    <div className="question-temp comp-children-container">
      <main className="main-QuastionTemp">
        <div className="score-rectangle" style={{ width: `${scoreRecWidth}vw` }}></div>
        <div className="numOfQuestion-place">
          <div className="numOfQuestion">
            <p>
              שאלה {quantityOfQuestion}/{currentQuestionIndex + 1}
            </p>
          </div>
        </div>
        <div className="question-content">
          <div className="question-place-father">
            <div className="question-place-child">
              <div className="question-img-place">
                <img
                  className="question-img img"
                  src={`${currentQuestion.imageUrl}`}
                  alt="pic of something that connected to the question"
                />
              </div>
              <h2 id="questionTitle">{currentQuestion.title}</h2>
              <hr id="hr" />
              <div className={changeFlexDir ? "button-place-one" : "button-place-two"}>
                <AnswersMap />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default QuestionTemp;
