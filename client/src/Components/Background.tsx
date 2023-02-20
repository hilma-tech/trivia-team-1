import rightLeaf from "../images/backgroundLeaves/rightLeaf.svg";
import leftLeaf from "../images/backgroundLeaves/leftLeaf.svg";
import { ContainerProps } from "@material-ui/core";
const Background = (props: ContainerProps) => (
  <div className="backgroundContainer">
    <img id="rightLeaf" src={rightLeaf} />
    <img id="leftLeaf" src={leftLeaf} />
    <div id="compChildrenContainer">
      {props.children}
    </div>
  </div>
);

export default Background;
