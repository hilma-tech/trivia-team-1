import { FC } from "react";
import { useNavigate } from "react-router";
import monkeyThink from "../../images/monkeyThink.svg";




const NoQuiz: FC = () => {

 const navigate = useNavigate();
    
  return (
    <div className="no-quizzes">
    <img src={monkeyThink} alt="monkeyThink" />
    <h2>יכול להיות שעדיין לא יצרת אף חידון?</h2>
    <button onClick={() => navigate('/add-quiz') }>אני רוצה ליצור עכשיו</button>
    </div>
  );
}

export default NoQuiz;