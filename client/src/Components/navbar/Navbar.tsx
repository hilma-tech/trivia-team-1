import ComputerNavbar from "./ComputerNavbar";
import PhoneNavBar from "./PhoneNavbar";


const Navbar = () => (

  window.innerWidth > 600 ?
    <ComputerNavbar /> : <PhoneNavBar name="ohad" type="ohad" />
)

export default Navbar;
