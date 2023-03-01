import { FC } from "react";
import { PhonePageWithNavProps } from "./phonePageWithNav";

import returnBtn from "../../images/navbar/returnNavBtn.svg";
import monkey from "../../images/navbar/monkey.svg"
import navbarLogo from "../../images/navbar/navbarLogo.svg";

import '../../style/phoneNavbar.scss'

const PhoneNavBar: FC< PhonePageWithNavProps > = ({ title, type }) => (
    //phone size

  type!=="banana"? <div className="navbar-container-phone">
        <div className="img-container">
            <img src={returnBtn} onClick={()=>{window.history.back()}} />
        </div>
        <div className="header-container">
            <h4>{title}</h4>
        </div>
        <div className="img-container" >
            <img className={type === "return" ? ' hide-monkey' : 'image'} src={monkey} />
        </div>
    </div> 
    :
     <div className="banana-container-phone">
    <h2 className="banana-nav-content">BANANA.games <img src={navbarLogo} />
        </h2> 
    </div>
);

export default PhoneNavBar;
