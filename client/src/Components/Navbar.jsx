import { Button, Link, Typography } from "@material-ui/core";
import navbarLogo from "../images/navbar/navbarLogo.svg";
import returnBtn from "../images/navbar/returnNavBtn.svg";
import monkey from "../images/navbar/monkey.svg"

const Navbar = (props) =>
  //computer size
  window.innerWidth > 450 ? (
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
          <Link variant="contained" color="primary">
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
  ) : (
    //phone size
    <div className="navbarContainerPhone">
      <div className="imgContainer">
        <img src={returnBtn} />
      </div>
      <div className="headerContainer">
        <h4>{props.name}</h4>
      </div>
      <div className="imgContainer" >
        <img className={props.type === 'myQuizzesMenu' || props.type === 'playQuizz' ? ' hideMonkey' : 'image' } src={monkey} />
      </div>
    </div>
  );
export default Navbar;
