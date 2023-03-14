import { Button, Link, Typography } from "@mui/material";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

import navbarLogo from "../../images/navbar/navbarLogo.svg";

const ComputerNavbar: FC = () => {

    const navigate = useNavigate()

    return (
        <div className="navbar-container-computer">
            <div className="first-section">
                <div className="btn-container">
                    <Button className="nav-quiz-btn" variant="contained" color="primary" onClick={() =>  navigate('/edit-quiz')} >
                        יצירת חידון
                    </Button>
                </div>
                <div className="vl-container">
                    <div className="vl"></div>
                </div>
                <div className="links-container">
                    <Button onClick={() =>  navigate('/my-quizzes')} className="nav-quiz-link">
                        החידונים שלי
                    </Button>
                    <div className="vl-container">
                        <div className="vl"></div>
                    </div>
                    <Button className="nav-quiz-link" onClick={() => navigate('/about')}>אודות</Button>
                </div>
            </div>
            <div className="navbar-container" onClick={() =>   navigate('/')}>
                <Typography className="navbar-logo-name" variant="h6" component="span">BANANA.games
                </Typography>
                <div className="navbar-logo-container">
                    <img className="navbar-logo" src={navbarLogo} />
                </div>
            </div>
        </div>
    )
}

export default ComputerNavbar;