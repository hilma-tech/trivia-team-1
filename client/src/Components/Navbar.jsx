import { Button, Link, Typography } from "@material-ui/core";
import navbarLogo from '../images/navbarLogo.svg'

const Navbar = () => (
  <div className="navbarContainer">
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
        <Typography id="logoName" variant="h6">BANANAS.Games</Typography>
        <div classname = "navbarLogoContainer">
        <img src={navbarLogo} />
        </div>
    </div>
  </div>
);

export default Navbar;
