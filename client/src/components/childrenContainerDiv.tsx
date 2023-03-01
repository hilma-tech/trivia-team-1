import { ContainerProps } from "@mui/material";
import '../style/background.scss'



function ChildrenDiv(props: ContainerProps) {
    return (
        <div className={`compChildrenContainer-boaz ${props.className}`}>
            {props.children}
        </div>);
}

export default ChildrenDiv;