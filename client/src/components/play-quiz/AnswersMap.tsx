import { parseImageSrc } from "../../common/functions/parseImageSrc";
import { CurrentQuestion } from "../../utils/Interfaces";
import { QuestionFromServer } from "./PlayQuiz";
import SelectImage from '../../images/image.svg'

interface AnswersMapProps {
  currentQuestion: QuestionFromServer | CurrentQuestion  ;
  changeFlexDir: boolean;
  redIndex: number | undefined;
  greenIndex: number | undefined;
  checkIfCorrect: (index: number) => void;
  isLargeScreen: boolean;
  resizeFull: (e: React.MouseEvent<HTMLDivElement>, index: number) => void;
  fullScreenIcon: string;
  fullScreenIndex: number | undefined;
  resizeShrink: (e: React.MouseEvent<HTMLDivElement>, index: number) => void;
}

export const AnswersMap: React.FC<AnswersMapProps> = ({ currentQuestion, changeFlexDir, redIndex, greenIndex, checkIfCorrect, isLargeScreen, resizeFull, fullScreenIcon, fullScreenIndex, resizeShrink }) => {
  console.log('greenIndex: ', greenIndex);
  console.log('redIndex: ', redIndex);
  return (<>
    {currentQuestion?.answers?.map((answer, index) => <div className="ans-div" key={`current-answer-${index}`}>
      <button className={(changeFlexDir ? "ans-button-no-img " : "ans-button-with-img ") + (redIndex === index ? "red-background-for-answer" : greenIndex === index ? "green-background-for-answer" : "")} key={index} onClick={() => {
        checkIfCorrect(index)
      }}>
        <div>
          <p className="answer-button">{answer.text}</p>
        </div>
        {parseImageSrc(answer?.imageUrl) !== SelectImage ? <div className="image-container">
          {!isLargeScreen && <div className="icon-div" onClick={e => resizeFull(e, index)}>
            <img src={fullScreenIcon} alt="full screen" />
          </div>}
          <div className={fullScreenIndex === index ? "question-img-div full-screen" : "question-img-div"} onClick={e => {
            if (fullScreenIndex === index) resizeShrink(e, index);
          }}>
            <img className="button-img" src={`${answer?.imageUrl}`} alt="answer" />
          </div>
        </div> : null}
      </button>
    </div>)}
  </>);
}

