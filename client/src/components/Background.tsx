import { ContainerProps } from "@mui/material";

import rightLeaf from "../images/backgroundLeaves/rightLeaf.svg";
import leftLeaf from "../images/backgroundLeaves/leftLeaf.svg";


const Background = (props: ContainerProps) => (
  window.innerWidth > 600 ? (
    <div className="background-container">
      <img id="right-leaf" src={rightLeaf} />
      <img id="left-leaf" src={leftLeaf} />
      <div>
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
