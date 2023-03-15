import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import triangleIcon from "../../images/triangeIcon.svg";
import italyPic from "../../images/question-template/italy.png";
import leave from "../../images/openingParagraph/leaveOpeningForTheQuiz.svg";
import OpeningParagraphTitle from "./OpeningParagraphTitle";
import CheckForName from "./CheckForName";
import PhonePageWithNav from "../navbar/phonePageWithNav";
import { useMediaQuery } from "@mui/material";
import axios from "axios";
import "../../style/OpeningForTheQuiz.scss";
import LoadingMonkey from "../LoadingMonkey";

function OpeningForTheQuiz() {
  const [imgUrl, setImgUrl] = useState("");
  const [quizTitle, setQuizTitle] = useState("איטליהה מה אתם יודעים?");
  const [paragraph, setParagraph] = useState(
    "לפני הטיסה לאיטליה רציתי לעשות לכם חידון על הארץ המיוחדת הזאת.. מהצפון ועד לדרום מה אתם יודעים? אוהבתת"
  );
  const [changeComponent, setChangeComponent] = useState(true);
  const [loading, setLoading] = useState<boolean>(true);
  const isLargeScreen = useMediaQuery("(min-width: 600px)");
  const { quizId } = useParams();

  useEffect(() => {
    getInfoFromServer();
    const timeout = setTimeout(() => setLoading(false), 4000);
    return () => clearTimeout(timeout);
  }, []);

  const getInfoFromServer = async () => {
    const response = await axios.get(`/api/quiz/${quizId}`);
    setImgUrl(response.data.imageUrl);
    setQuizTitle(response.data.title);
    setParagraph(response.data.description);
  };

  if (loading) return <LoadingMonkey />;

  return isLargeScreen ? (
    <div className="comp-children-container comp-children-container-question">
      {changeComponent ? (
        <main>
          <OpeningParagraphTitle
            quizTitle={quizTitle}
            paragraph={paragraph}
            imgUrl={imgUrl}
            changeComponent={changeComponent}
            setChangeComponent={setChangeComponent}
          />
        </main>
      ) : (
        <main>
          <CheckForName quizTitle={quizTitle} />
        </main>
      )}
    </div>
  ) : (
    <div>
      {changeComponent ? (
        <PhonePageWithNav type="banana" title={quizTitle} className="comp-children-container-question">
          <main className="question-main">
            <OpeningParagraphTitle
              quizTitle={quizTitle}
              paragraph={paragraph}
              imgUrl={imgUrl}
              changeComponent={changeComponent}
              setChangeComponent={setChangeComponent}
            />
            <footer className="opening-paragraph-title-footer">
              <img src={leave} alt="icon of triangle" />
            </footer>
          </main>
        </PhonePageWithNav>
      ) : (
        <PhonePageWithNav type="return" title={quizTitle} className="comp-children-container-question">
          <main className="question-main">
            <CheckForName quizTitle={quizTitle} />
            <footer className="check-for-name-footer">
              <img src={leave} alt="icon of triangle" />
            </footer>
          </main>
        </PhonePageWithNav>
      )}
    </div>
  );
}

export default OpeningForTheQuiz;
