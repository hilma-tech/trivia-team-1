import ComputerNavbar from "./ComputerNavbar";
import PhoneNavBar from "./PhoneNavbar";


const Navbar = () => (

  window.innerWidth > 600 ?
    <ComputerNavbar /> : null 
)

export default Navbar;
