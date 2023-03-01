import { Button, Link, Typography } from "@mui/material";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

import navbarLogo from "../../images/navbar/navbarLogo.svg";


const ComputerNavbar:FC = () => {

    const Navigate = useNavigate()
    
    const onClick = (linkTo: 'myQuizzes' | 'createQuiz' | 'about') => {
        switch (linkTo){
            case 'myQuizzes':
                Navigate('/my-quizzes')
                break;
            case 'createQuiz':
                Navigate('/createQuiz')
                break;
            case 'about':
                Navigate('/about')
                break; 
        }
    }
    
    return (
    <div className="navbar-container-computer">
        <div className="first-section">
            <div className="btn-container">
                <Button className="nav-quiz-btn" variant="contained" color="primary">
                    יצירת חידון
                </Button>
            </div>
            <div className="vl-container">
                <div className="vl"></div>
            </div>
            <div className="links-container">
                <Button onClick={() => onClick('myQuizzes')} className="nav-quiz-btn">
                    החידונים שלי
                </Button>
                <div className="vl-container">
                    <div className="vl"></div>
                </div>
                <Button className="nav-quiz-btn">אודות</Button>
            </div>
        </div>
        <div className="logo-nav-bar-container">
            <Typography id="logo-name" variant="h6">BANANA.games
            </Typography>
            <div className="navbar-logo-container">
                <img src={navbarLogo} />
            </div>
        </div>
    </div>
)}

export default ComputerNavbar;