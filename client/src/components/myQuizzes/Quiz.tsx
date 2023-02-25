import React, { FC, useEffect, useState } from "react";
import TrashSvg from "../../images/trash.svg";
import LinkSvg from "../../images/link.svg";
import EditSvg from "../../images/edit.svg";
import ScoreboardSvg from "../../images/scoreboard.svg";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuPic from "../../images/dottedMenu.png"
import { useNavigate } from "react-router-dom";
import GenericPop from "../popups/GenericPop";
import { usePopContext } from "../popups/popContext";
// const {setPopOpen, popOpen, `  popHandleClickOpen,popHandleClose}  = usePopContext();

//destructure context
// const {setPopOpen, popOpen, popHandleClickOpen,popHandleClose}  = usePopContext();




interface QuizProps {
  id: number;
  name: string;
  url: string;
  description: string;
  answers: number
}


const Quiz: FC<QuizProps> = (props) => {
  const { setPopOpen, popOpen, popHandleClickOpen, popHandleClose } = usePopContext();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const navigate = useNavigate()
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { id, name, url, description, answers } = props;
  const toScoreboard = (id: number) => {
    navigate(`${id}/scoreboard`)
  }
  const toEdit = (id: number) => {
    console.log("rere");

  }
  const linkCopied = (id: number) => {

  }
  const deleteQuiz = (id: number) => {

  }

  if (window.innerWidth > 600) {
    return (

      <div className="quiz">
        <div className="quiz-image" style={{ backgroundImage: `url('${url}')`, backgroundSize: "cover" }}>
          <span>{answers} תשובות</span>
        </div>
        <div className="quiz-data">
          <h3>{name}</h3>
          <div className="holder"></div>
          <p>{description}</p>
          <div className="quiz-buttons">
            <button className="scoreboard-button" onClick={() => console.log('clicked!')}><span>לוח תוצאות</span></button>
            <div>
              <button className="emoji-buttons" onClick={() => popHandleClickOpen()}><img src={LinkSvg} alt="link" /></button>
              <button className="emoji-buttons" onClick={() => toEdit(id)}><img src={EditSvg} alt="edit" /></button>
              <Button className="emoji-buttons" onClick={() => deleteQuiz(id)}><img src={TrashSvg} alt="trash" /></Button>

            </div>
          </div>
        </div>

        {/* copy popup button is here, activated only when button is pressed */}
        <GenericPop type="deleteQuiz" />
      </div>
    );
  }
  else {
    return (<div className="quiz">
      <div className="quiz-image" style={{ backgroundImage: `url('${url}')`, backgroundSize: "cover" }}>
        <span className="answers">{answers} תשובות</span>
      </div>
      <div className="quiz-data">
        <Button
          id="basic-button"
          aria-controls={!!anchorEl ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={!!anchorEl ? 'true' : undefined}
          onClick={handleClick}
        >
          <img src={MenuPic} />
        </Button>
        <h3>{name}</h3>
        <div className="holder"></div>
        <Menu
          className="quiz-menu"
          PaperProps={{ sx: { width: '70vw', height: '32vh' } }}
          anchorEl={anchorEl}
          open={!!anchorEl}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button'
          }}
        >
          <MenuItem className="quiz-menu-item" onClick={handleClose}><div className="scoreBoardButton" onClick={() => toScoreboard(id)}><img src={ScoreboardSvg} alt="score" /><span>לוח תוצאות</span></div></MenuItem>
          <MenuItem className="quiz-menu-item" onClick={handleClose}><div className="emojiButtons" onClick={() => popHandleClickOpen()}><img src={LinkSvg} alt="link" /><span>שליחת קישור למשחק</span></div></MenuItem>
          <MenuItem className="quiz-menu-item" onClick={handleClose}><div className="emojiButtons" onClick={() => toEdit(id)}><img src={EditSvg} alt="edit" /><span>עריכת משחק</span></div></MenuItem>
          <MenuItem className="quiz-menu-item" onClick={handleClose}> <div className="emojiButtons" onClick={() => deleteQuiz(id)}><img src={TrashSvg} alt="trash" /><span>מחיקת משחק</span></div></MenuItem>

        </Menu>

      </div>
      {/* copy popup button is here, activated only when button is pressed */}
      <GenericPop type="finishedQuiz" />
    </div>)
  }
}

export default Quiz;