import { FC } from "react";
import returnBtn from "../../images/navbar/returnNavBtn.svg";
import monkey from "../../images/navbar/monkey.svg"


const PhoneNavBar: FC<{ name: string, type: string }> = ({ name, type }) => (
    //phone size
    <div className="navbar-container-phone">
        <div className="img-container">
            <img src={returnBtn} />
        </div>
        <div className="header-container">
            <h4>{name}</h4>
        </div>
        <div className="img-container" >
            <img className={type === 'myQuizzesMenu' || type === 'playQuizz' ? ' hide-monkey' : 'image'} src={monkey} />
        </div>
    </div>
);

export default PhoneNavBar;
