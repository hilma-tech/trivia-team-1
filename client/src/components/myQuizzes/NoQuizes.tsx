import { FC } from "react";
import monkeyThink from "../../images/monkeyThink.svg";




const NoQuiz: FC = () => {
 
    
  return (
    <div className="no-quizzes">
    <img src={monkeyThink} alt="monkeyThink" />
    <h2>יכול להיות שעדיין לא יצרת אף חידון?</h2>
    <button>אני רוצה ליצור עכשיו</button>
    </div>
  );
}

export default NoQuiz;