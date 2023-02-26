import rightLeaf from "../images/backgroundLeaves/rightLeaf.svg";
import leftLeaf from "../images/backgroundLeaves/leftLeaf.svg";
import bottomLeaf from "../images/backgroundLeaves/bottomLeaf.svg"
import { ContainerProps } from "@mui/material";


const Background = (props: ContainerProps) => (
  window.innerWidth > 600 ? (
    <div className="background-container">
      <img id="right-leaf" src={rightLeaf} />
      <img id="left-leaf" src={leftLeaf} />
      <div id="comp-children-container">
        {props.children}
      </div>
    </div>
  ) : (
    <div className = "background-container-phone"> 
     
        {props.children}
     
      {/* <img id="bottom-leaf" src={bottomLeaf} /> */}
    </div>
  )
);

export default Background;
