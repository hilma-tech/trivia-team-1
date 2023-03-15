import React, { useContext, useState } from "react";
import { useMediaQuery } from "@mui/material";
import triangleIcon from "../../icons/icon-awesome-play.png";
import { useNavigate } from "react-router-dom";
import arrowRight from "../../icons/arrow-right.svg";
import PhonePageWithNav from "../navbar/phonePageWithNav";
import { usePlayerName } from "../../context/PlayerNameContext";
import { useEffect } from "react";
import { launchPageAnimation } from "../../common/functions/LaunchPageAnimation";
interface CheckForNameProps {
  quizTitle: string;
}

const CheckForName: React.FC<CheckForNameProps> = ({ quizTitle }) => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { playerName, setPlayerName } = usePlayerName()
  const isLargeScreen = useMediaQuery("(min-width: 600px)");

  function moveToGameWithWithPlayerName() {
    if (!playerName) setErrorMessage('אנא מלא את הכינוי שלך')
    else {
      makeOpacity();
      setTimeout(() => {
        navigate("./questions");
      }, 1050)
    }
  }

  const [animationOpacity, setAnimationOpacity] = useState<boolean>(true);
  const animationClassExpression = animationOpacity ? 'opacity-on ' : ''

  useEffect(() => {
    launchPageAnimation(setAnimationOpacity)
  }, [])

  const makeOpacity = () => {
    setAnimationOpacity(true);
    setTimeout(() => {
      setAnimationOpacity(false);
    }, 1600)
  }


  return isLargeScreen ? (
    <main>
      <div className={animationClassExpression + "main-check-for-name-for-flex"}>
        <div className="main-check-for-name">
          <div className="title-and-paragraph">
            <h1 className="main-quiz-title">{quizTitle}</h1>
            <p>איך קוראים לכם?</p>
          </div>
          <input
            onChange={(e) => setPlayerName(e.target.value)}
            name="player-identification"
            type="text"
            placeholder="נא להזין שם"
            value={playerName}
            required
          />
          <button className="check-for-name-button" onClick={moveToGameWithWithPlayerName}>
            <p>יאללה בואו נתחיל!</p>
            <img src={triangleIcon} alt="icon of triangle" />
          </button>
          <div className="error-message">{errorMessage}</div>
        </div>
      </div>
    </main>
  ) : (
    <div>
      <div className={animationClassExpression + "main-check-for-name-for-flex"}>
        <div className="main-check-for-name">
          <div className="title-and-paragraph">
            <p>איך קוראים לכם?</p>
          </div>
          <input
            onChange={(e) => setPlayerName(e.target.value)}
            name="player-identification"
            type="text"
            placeholder="נא להזין שם"
            value={playerName}
            required
          />
          <button className="check-for-name-button" onClick={moveToGameWithWithPlayerName}>
            <p>יאללה בואו נתחיל!</p>
            <img src={triangleIcon} alt="icon of triangle" />
          </button>
          <p className="error-message">{errorMessage}</p>
        </div>
      </div>
    </div>
  );
};
export default CheckForName;
