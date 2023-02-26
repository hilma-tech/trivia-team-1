import { Button, Link, Typography } from "@mui/material";
import { FC } from "react";
import navbarLogo from "../../images/navbar/navbarLogo.svg";


const ComputerNavbar:FC = () => (
    <div className="navbar-container-computer">
        <div className="first-section">
            <div className="btn-container">
                <Button id="nav-create-quiz-btn" variant="contained" color="primary">
                    יצירת חידון
                </Button>
            </div>
            <div className="vl-container">
                <div className="vl"></div>
            </div>
            <div className="links-container">
                <Link color="primary">
                    החידונים שלי
                </Link>
                <div className="vl-container">
                    <div className="vl"></div>
                </div>
                <Link>אודות</Link>
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
)

export default ComputerNavbar;