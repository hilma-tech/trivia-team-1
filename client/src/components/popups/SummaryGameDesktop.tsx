import { Button, Typography } from "@mui/material";
import { FC, useEffect } from "react";
import desktopMonkey from "../../images/popUps/desktopMonkey.svg";
import ShareIcon from "@mui/icons-material/Share";
import { usePopContext } from "./popContext";
import { useParams } from "react-router-dom";
import { postScore } from "../../common/functions/postScore";
import { usePlayerName } from "../../context/PlayerNameContext";
import { copyScoreBoardLink } from "../../common/functions/copyScoreBoardLink";
import "../../style/popups.scss";

export const SummaryGameDesktop: FC = () => {

  const { correctAnswers, numOfQuestions } = usePopContext();
  const { quizId, userName } = useParams();
  const { playerName, setPlayerName } = usePlayerName();
  const score = Math.round(correctAnswers / numOfQuestions * 100)

  useEffect(() => {
    postScore(quizId, playerName, score)
    if (!quizId || !numOfQuestions) window.history.back()
  }, [])


  useEffect(() => {
    setPlayerName("")
  }, [])



  return (
    <>
      <div className="comp-children-container computer-finish-game confetti-pc">
        <div className="white-background-container">
          <img alt="finished game monkey" src={desktopMonkey} />
          <Typography
            component="h1"
            className="computer-finish-game-inner-text header"
            variant="h3"
            sx={{ fontWeight: "bolder", paddingTop: "6vh" }}
          >
            ענית נכון על {correctAnswers} שאלות. ציונך: {score}
          </Typography>
          <Typography component="h2" className="computer-finish-game-inner-text body" variant="body1">
            שתף את התוצאה שלך עם חברים ואתגר גם אותם במבחן!
          </Typography>
          <Button
            sx={{ width: "15vw", height: "7vh", fontSize: "1.2rem", fontWeight: "1000", marginTop: '4vh' }}
            variant="contained"
            color="primary"
            onClick={() => copyScoreBoardLink(Number(quizId))}
          >
            <ShareIcon sx={{ fontSize: "1.8rem", marginLeft: "1vw" }} />
            שתף תוצאה
          </Button>
        </div>
      </div>
    </>
  );
};
