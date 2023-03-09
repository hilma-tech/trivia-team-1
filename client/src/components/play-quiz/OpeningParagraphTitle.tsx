import React from "react";
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
  const moveToQuiz = () => {
    setChangeComponent((prev) => !prev);
  };

  return (
    <main>
      <div className="main-OpeningForTheQuiz">
        <div className="main-paragraph-and-title">
          <h1>{quizTitle}</h1>
          <p>{paragraph}</p>
        </div>
        <div
          className="main-img"
          style={{
            backgroundImage: `url("${imgUrl}")`,
          }}
        >
          <div className="main-button-place">
            <button onClick={moveToQuiz} className="main-button-to-quiz">
              <p>התחילו לשחק</p>
              <img src={`${triangleIcon}`} alt="icon of triangle" />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default OpeningParagraphTitle;
