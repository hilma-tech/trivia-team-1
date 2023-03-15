import { ContainerProps } from "@mui/material";
import clsx from "clsx";

import PhoneNavBar from "./PhoneNavbar";

import '../../style/phoneNavbar.scss'

export interface PhonePageWithNavProps extends ContainerProps {
    type: "banana" | "image" | "return";
    title: string;
}

function PhonePageWithNav(props: PhonePageWithNavProps) {
    const className = clsx('phone-main', props.className)
    return (
        <div>
            <PhoneNavBar type={props.type} title={props.title} />
            <main className={className}>{props.children}</main>
        </div>
    );
}

export default PhonePageWithNav;