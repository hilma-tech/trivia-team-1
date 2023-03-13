import { Button, Typography } from "@mui/material";
import { FC } from "react";
import "../../style/popups.scss";
import desktopMonkey from "../../images/popUps/desktopMonkey.svg";
import ShareIcon from "@mui/icons-material/Share";
import { usePopContext } from "./popContext";
import { useParams } from "react-router";

export const SummaryGameDesktop: FC = () => {

  const { correctAnswers, numOfQuestions } = usePopContext();
  const {quizId, userName } = useParams();

  const copyLink = () => {

  }
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
            ענית נכון על {correctAnswers} שאלות. ציונך: {Math.round(correctAnswers / numOfQuestions * 100)}
          </Typography>
          <Typography component="h2" className="computer-finish-game-inner-text body" variant="body1">
            שתף את התוצאה שלך עם חברים ואתגר גם אותם במבחן!
          </Typography>
          <Button
            sx={{ width: "15vw", height: "7vh", fontSize: "1.5rem", fontWeight: "bolder", marginTop: '4vh' }}
            variant="contained"
            color="primary"
          >
            <ShareIcon sx={{ fontSize: "2rem", marginLeft: "1vw" }} onClick={copyLink}/>
            שתף תוצאה
          </Button>
        </div>
      </div>
    </>
  );
};
