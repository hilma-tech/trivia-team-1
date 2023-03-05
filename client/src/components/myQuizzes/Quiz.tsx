import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TrashSvg from "../../images/trash.svg";
import LinkSvg from "../../images/link.svg";
import EditSvg from "../../images/edit.svg";
import ScoreboardSvg from "../../images/scoreboard.svg";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuPic from "../../images/dottedMenu.png"
import GenericPop from "../popups/GenericPop";
import { usePopContext } from "../popups/popContext";
import useMediaQuery from '@mui/material/useMediaQuery';


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
  const isMobile = useMediaQuery('(min-width:600px)')

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

  }
  const linkCopied = (id: number) => {

  }
  const deleteQuiz = (id: number) => {

  }

  if (isMobile) {
    return (
      <div className="quiz">
        <div className="quiz-image" style={{ backgroundImage: `url('${url}')`, backgroundSize: "cover" }}>
          <span>{answers} תשובות</span>
        </div>
        <div className="quiz-data">
          <div className="quiz-title">{name}</div>
          <div className="holder"></div>
          <p>{description}</p>
          <div className="quiz-buttons">
            <button className="scoreboard-button" onClick={() => alert('clicked!')}><span>לוח תוצאות</span></button>
            <div>
              <button className="emoji-buttons" onClick={() => popHandleClickOpen()}><img src={LinkSvg} alt="link" /></button>
              <button className="emoji-buttons" onClick={() => toEdit(id)}><img src={EditSvg} alt="edit" /></button>
              <button className="emoji-buttons" onClick={() => deleteQuiz(id)}><img src={TrashSvg} alt="trash" /></button>

            </div>
          </div>
        </div>

        {/* copy popup button is here, activated only when button is pressed */}
        <GenericPop type="saveChanges" />
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
          <img alt="menu" src={MenuPic} />
        </Button>
        <div className="quiz-title">{name}</div>
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
      <GenericPop type="deleteQuiz" />
    </div>)
  }
}

export default Quiz;