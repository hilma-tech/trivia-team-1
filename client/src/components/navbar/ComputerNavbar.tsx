import { Button, Link, Typography } from "@mui/material";
import navbarLogo from "../../images/navbar/navbarLogo.svg";


const ComputerNavbar = () => (
    <div className="navbarContainerComputer">
        <div className="firstSection">
            <div className="btnContainer">
                <Button id="navCreateQuizBtn" variant="contained" color="primary">
                    יצירת חידון
                </Button>
            </div>
            <div className="vlContainer">
                <div className="vl"></div>
            </div>
            <div className="linksContainer">
                <Link color="primary">
                    החידונים שלי
                </Link>
                <div className="vlContainer">
                    <div className="vl"></div>
                </div>
                <Link>אודות</Link>
            </div>
        </div>
        <div className="logoNavBarContainer">
            <Typography id="logoName" variant="h6">BANANA.games
            </Typography>
            <div className="navbarLogoContainer">
                <img src={navbarLogo} />
            </div>
        </div>
    </div>
)

export default ComputerNavbar;