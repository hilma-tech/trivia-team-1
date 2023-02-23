import rightLeaf from "../images/backgroundLeaves/rightLeaf.svg";
import leftLeaf from "../images/backgroundLeaves/leftLeaf.svg";
import bottomLeaf from "../images/backgroundLeaves/bottomLeaf.svg"
import { ContainerProps } from "@mui/material";


const Background = (props: ContainerProps) => (
  window.innerWidth > 600 ? (
    <div className="backgroundContainer">
      <img id="rightLeaf" src={rightLeaf} />
      <img id="leftLeaf" src={leftLeaf} />
      {props.children}
    </div>
  ) : (
    <div className = "backgroundContainerPhone"> 
        {props.children}
      {/* <img id="bottomLeaf" src={bottomLeaf} /> */}
    </div>
  )
);

export default Background;
