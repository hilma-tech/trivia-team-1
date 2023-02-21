import { FC } from "react";
import returnBtn from "../../images/navbar/returnNavBtn.svg";
import monkey from "../../images/navbar/monkey.svg"


const PhoneNavBar: FC<{ name: string, type: string }> = ({ name, type }) => (
    //phone size
    <div className="navbarContainerPhone">
        <div className="imgContainer">
            <img src={returnBtn} />
        </div>
        <div className="headerContainer">
            <h4>{name}</h4>
        </div>
        <div className="imgContainer" >
            <img className={type === 'myQuizzesMenu' || type === 'playQuizz' ? ' hideMonkey' : 'image'} src={monkey} />
        </div>
    </div>
);

export default PhoneNavBar;
