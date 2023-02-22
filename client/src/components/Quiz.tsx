import React, { FC, useEffect, useState } from "react";
import TrashSvg from "../images/trash.svg";
import LinkSvg from "../images/link.svg";
import EditSvg from "../images/edit.svg";
import ScoreboardSvg from "../images/scoreboard.svg";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';




interface QuizProps {
  id: number;
  name: string;
  url: string;
  description: string;
  answers: number
}


const Quiz: FC<QuizProps> = (props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { id, name, url, description, answers } = props;
  const toScoreboard = (id: number) => {
  }
  const toEdit = (id: number) => {
    console.log("rere");

  }
  const linkCopied = (id: number) => {

  }
  const deleteQuiz = (id: number) => {

  }

 if(window.innerWidth>600){
  return (
    <div className="quiz">
      <div className="quizImage" style={{ backgroundImage: `url('${url}')`, backgroundSize: "cover" }}>
        <h4>{answers} תשובות</h4>
      </div>
      <div className="quizData">
        <h3>{name}</h3>
        <div className="holder"></div>
        <p>{description}</p>
        <div className="quizButtons">
          <button className="scoreBoardButton" onClick={() => toScoreboard(id)}><span>לוח תוצאות</span></button>
          <button className="emojiButtons" onClick={() => linkCopied(id)}><img src={LinkSvg} alt="link" /></button>
          <button className="emojiButtons" onClick={() => toEdit(id)}><img src={EditSvg} alt="edit" /></button>
          <button className="emojiButtons" onClick={() => deleteQuiz(id)}><img src={TrashSvg} alt="trash" /></button>
        </div>
      </div>
    </div>
  );
 }
 else{
  return (<div className="quiz">
  <div className="quizImage" style={{ backgroundImage: `url('${url}')`, backgroundSize: "cover" }}>
    <h4>{answers} תשובות</h4>
  </div>
  <div className="quizData">
  <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
    <img src="https://img.icons8.com/ios11/600/000000/menu-2.png"/>
      </Button>
    <h3>{name}</h3>
    <div className="holder"></div>
        <Menu
        className="quizMenu"
        PaperProps={{sx: {width: '70vw', height: '33vh'}}}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem className="quizMenuItem" onClick={handleClose}><div className="scoreBoardButton" onClick={() => toScoreboard(id)}><img src={ScoreboardSvg} alt="score" /><span>לוח תוצאות</span></div></MenuItem>
        <MenuItem className="quizMenuItem" onClick={handleClose}><div className="emojiButtons" onClick={() => linkCopied(id)}><img className="shraga" src={LinkSvg} alt="link" /><span>שליחת קישור למשחק</span></div></MenuItem>
        <MenuItem className="quizMenuItem" onClick={handleClose}><div className="emojiButtons" onClick={() => toEdit(id)}><img src={EditSvg} alt="edit" /><span>עריכת משחק</span></div></MenuItem>
        <MenuItem className="quizMenuItem" onClick={handleClose}> <div className="emojiButtons" onClick={() => deleteQuiz(id)}><img src={TrashSvg} alt="trash" /><span>מחיקת משחק</span></div></MenuItem>
      </Menu>
      </div>
</div>)
 }
}

export default Quiz;