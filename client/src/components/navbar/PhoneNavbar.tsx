import { FC } from "react";
import returnBtn from "../../images/navbar/returnNavBtn.svg";
import monkey from "../../images/navbar/monkey.svg"
import '/home/hilma/Desktop/first big proj/trivia-team-1/client/src/style/phoneNavbar.scss'
import { Typography } from "@mui/material";
import navbarLogo from "../../images/navbar/navbarLogo.svg";

const PhoneNavBar: FC<{ title: string, type: string }> = ({ title, type }) => (
    //phone size

  type!=="banana"? <div className="navbar-container-phone">
        <div className="img-container">
            <img src={returnBtn} />
        </div>
        <div className="header-container">
            <h4>{title}</h4>
        </div>
        <div className="img-container" >
            <img className={type === 'return' ? ' hide-monkey' : 'image'} src={monkey} />
        </div>
    </div> 
    :
     <div className="banana-container-phone">
    <h2 className="banana-nav-content">BANANA.games <img src={navbarLogo} />
        </h2> 
    </div>
);

export default PhoneNavBar;
