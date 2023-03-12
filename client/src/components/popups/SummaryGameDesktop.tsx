import { Button, Typography } from "@mui/material";
import { FC } from "react";
import "../../style/popups.scss";
import desktopMonkey from "../../images/popUps/desktopMonkey.svg";
import ShareIcon from "@mui/icons-material/Share";
import { usePopContext } from "./popContext";

export const SummaryGameDesktop: FC = () => {

  const { correctAnswers } = usePopContext();


  return (
    <>
      <div className="comp-children-container computer-finish-game confetti-pc">
        <img alt="finished game monkey" src={desktopMonkey} />
        <Typography
          component="h1"
          className="computer-finish-game-inner-text"
          variant="h3"
          sx={{ fontWeight: "bolder", paddingTop: "6vh" }}
        >
          ענית נכון על {correctAnswers} שאלות. ציונך: {correctAnswers * 10}
        </Typography>
        <Typography component="h2" className="computer-finish-game-inner-text" variant="h6">
          שתף את התוצאה שלך עם חברים ואתגר גם אותם במבחן!
        </Typography>
        <Button
          sx={{ width: "25vw", height: "8vh", fontSize: "1.5rem", fontWeight: "bolder", marginTop: '4vh' }}
          variant="contained"
          color="primary"
        >
          <ShareIcon sx={{ fontSize: "2rem", marginLeft: "1vw" }} />
          שתף תוצאה
        </Button>
      </div>
    </>
  );
};
