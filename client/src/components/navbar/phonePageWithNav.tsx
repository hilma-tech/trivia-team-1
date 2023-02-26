import { ContainerProps } from "@mui/material";
import PhoneNavBar from "./PhoneNavbar";
import '/home/hilma/Desktop/first big proj/trivia-team-1/client/src/style/phoneNavbar.scss'

interface PhonePageWithNavProps extends ContainerProps {
    type: string;
    title: string;
  }

function PhonePageWithNav(props: PhonePageWithNavProps) {
    return ( 
        <div>
            <PhoneNavBar type={props.type} title={props.title}/>
            <main className={`phone-main ${props.className}`}>{props.children}</main>
        </div>
     );
}

export default PhonePageWithNav;