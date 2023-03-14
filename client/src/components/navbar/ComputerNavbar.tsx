import { Button, Link, Typography } from "@mui/material";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

import navbarLogo from "../../images/navbar/navbarLogo.svg";

enum LinkTo {
    MyQuizzes= 1,
    CreateQuiz= 2,
    About = 3
}


const ComputerNavbar:FC = () => {
    const navigate = useNavigate()
    
    const handleClick = (linkTo: LinkTo) => {
        switch (linkTo){
            case LinkTo.MyQuizzes:
                navigate('/my-quizzes')
                break;
            case LinkTo.CreateQuiz:
                navigate('/edit-quiz')
                break;
            case LinkTo.About:
                navigate('/about')
                break; 
        }
    }
    
    return (
    <div className="navbar-container-computer">
        <div className="first-section">
            <div className="btn-container">
                <Button className="nav-quiz-btn" variant="contained" color="primary" onClick={() => handleClick(LinkTo.CreateQuiz)} > 
                    יצירת חידון
                </Button>
            </div>
            <div className="vl-container">
                <div className="vl"></div>
            </div>
            <div className="links-container">
                <Button onClick={() => handleClick(LinkTo.MyQuizzes)} className="nav-quiz-link">
                    החידונים שלי
                </Button>
                <div className="vl-container">
                    <div className="vl"></div>
                </div>
                <Button className="nav-quiz-link" onClick={() => handleClick(LinkTo.About)}>אודות</Button>
            </div>
        </div>
        <div className="navbar-container">
            <Typography className="navbar-logo-name" variant="h6">BANANA.games
            </Typography>
            <div className="navbar-logo-container">
                <img className="navbar-logo" src={navbarLogo} />
            </div>
        </div>
    </div>
)}

export default ComputerNavbar;