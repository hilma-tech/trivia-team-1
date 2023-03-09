import { ContainerProps } from "@mui/material";
import '../style/background.scss'



function ChildrenDiv(props: ContainerProps) {
    return (
        <div className={`comp-children-container-question ${props.className}`}>
            {props.children}
        </div>);
}

export default ChildrenDiv;