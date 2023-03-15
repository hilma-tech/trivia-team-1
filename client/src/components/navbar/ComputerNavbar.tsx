import { Button, Link, Typography } from "@mui/material";
import { FC, useState } from "react";
import { To, useNavigate } from "react-router-dom";

import navbarLogo from "../../images/navbar/navbarLogo.svg";

const ComputerNavbar: FC = () => {

    const [activePage, setActivePage] = useState<To>('/my-quizzes')
    const navigate = useNavigate()

    function handleClick(path: To) {
        setActivePage(path)
        navigate(path)
    }
    return (
        <div className="navbar-container-computer">
            <div className="first-section">
                <div className="btn-container">
                    <Button onClick={() => handleClick('/add-quiz')} className={activePage === '/add-quiz' ? 'nav-quiz-btn-active' : 'nav-quiz-btn'}>
                        יצירת חידון
                    </Button>
                </div>
                <div className="vl-container">
                    <div className="vl"></div>
                </div>
                <div className="links-container">
                    <Button onClick={() => handleClick('/my-quizzes')} className={activePage === '/my-quizzes' ? 'nav-quiz-btn-active' : 'nav-quiz-btn'}>
                        החידונים שלי
                    </Button>
                    <div className="vl-container">
                        <div className="vl"></div>
                    </div>
                    <Button onClick={() => handleClick('/about')} className={activePage === '/about' ? 'nav-quiz-btn-active' : 'nav-quiz-btn'}>
                        אודות
                    </Button>
                </div>
            </div>
            <div className="navbar-container" onClick={() => navigate('/')}>
                <Typography className="navbar-logo-name" variant="h6" component="span">BANANA.games
                </Typography>
                <div className="navbar-logo-container">
                    <img className="navbar-logo" src={navbarLogo} alt="banana logo" />
                </div>
            </div>
        </div>
    )
}

export default ComputerNavbar;