import React, { useEffect, useState } from "react";
import { launchPageAnimation } from "../../common/functions/LaunchPageAnimation";
import triangleIcon from "../../icons/icon-awesome-play.png";
import "../../style/OpeningForTheQuiz.scss";

interface OpeningParagraphTitleProps {
  quizTitle: string;
  paragraph: string;
  imgUrl: string;
  changeComponent: boolean;
  setChangeComponent: React.Dispatch<React.SetStateAction<boolean>>;
}

const OpeningParagraphTitle: React.FC<OpeningParagraphTitleProps> = ({
  quizTitle,
  paragraph,
  imgUrl,
  setChangeComponent,
}) => {
  
  const [animationOpacity, setAnimationOpacity] = useState<boolean>(true);
  const animationClassExpression = animationOpacity ? 'opacity-on ' : ''

  useEffect(() => {
    launchPageAnimation(setAnimationOpacity)
  }, [])

  const moveToQuiz = () => {
    makeOpacity();
    setTimeout(() => {
      setChangeComponent((prev) => !prev);
    }, 1050)
  };
  
  const makeOpacity = () => {
    setAnimationOpacity(true);
    setTimeout(() => {
      setAnimationOpacity(false);
    }, 1600)
  }

  return (
    <>
      <div className={animationClassExpression + 'main-opening-for-the-quiz'}>
        <div className="main-paragraph-and-title">
          <h1 className="main-quiz-title">{quizTitle}</h1>
          <p className="main-paragraph">{paragraph}</p>
        </div>
        <div
          className="main-img"
          style={{
            backgroundImage: `url("${imgUrl}")`,
          }}
        >
          <div className="main-button-place">
            <button onClick={moveToQuiz} className="main-button-to-quiz">
              <span>התחילו לשחק</span>
              <img src={`${triangleIcon}`} alt="icon of triangle" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OpeningParagraphTitle