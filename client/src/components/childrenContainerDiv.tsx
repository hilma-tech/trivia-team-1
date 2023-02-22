import { ContainerProps } from "@mui/material";
import '../style/background.scss'



function ChildrenDiv(props: ContainerProps) {
    return (
        <div id="compChildrenContainer" className={props.className}>
            {props.children}
        </div>);
}

export default ChildrenDiv;