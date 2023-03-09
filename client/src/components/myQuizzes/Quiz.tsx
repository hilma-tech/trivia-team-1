import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Question, QuizType } from "./MyQuizes";
import TrashSvg from "../../images/trash.svg";
import LinkSvg from "../../images/link.svg";
import EditSvg from "../../images/edit.svg";
import ScoreboardSvg from "../../images/scoreboard.svg";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuPic from "../../images/dottedMenu.png"
import { usePopContext } from "../popups/popContext";
import useMediaQuery from '@mui/material/useMediaQuery';
import { Type } from "../popups/GenericPopParts";


interface QuizProps {
  id: number;
  title: string;
  imageUrl: string;
  description: string;
  questions: Question[];
  setQuizes: React.Dispatch<React.SetStateAction<QuizType[]>>;
  quizzes: QuizType[];
}


const Quiz: FC<QuizProps> = (props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [savedId, setId] = React.useState<number>(-800);
  const { setPopType ,popHandleClickOpen,setDeletedQuizId, deletedQuizId  } = usePopContext();
  const isMobile = useMediaQuery('(min-width:600px)');
  const navigate = useNavigate();
  //TODO; temporary
  const username = "ofek";
  const { id, title, imageUrl, description, questions, setQuizes, quizzes } = props;

  useEffect(() => {    
    if(deletedQuizId===0 && savedId!==-800){
     
      deleteQuizFromClient(savedId);
      }
  }, [deletedQuizId])


  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const copyQuizLink = (id: number) => {
    setPopType(Type.CopyQuiz);
  //!copy to clipboard the right quiz link
    navigator.clipboard.writeText(`http://localhost:3000/${username}/quiz/${id}`)
    popHandleClickOpen();
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toScoreboard = (id: number) => {
    navigate(`/quiz/:userId/:quizId/scores`)
  }
  const toEdit = (id: number) => {

  }

  const deleteQuizFromClient = (id: number) => {
    let newQuiz = quizzes.filter(quiz => quiz.id !== id);    
    setQuizes(newQuiz);
  }

  const deleteQuiz =  async (id: number) => {
    setPopType(Type.DeleteQuiz);
    setDeletedQuizId(id);
    setId(id);
    popHandleClickOpen();  
  }

  

  if (isMobile) {
    return (
      <div className="quiz">
        <div className="quiz-image" style={{ backgroundImage: `url('${imageUrl}')`, backgroundSize: "cover" }}>
          <span>{questions.length} תשובות</span>
        </div>
        <div className="quiz-data">
          <div className="quiz-title">{title}</div>
          <div className="holder"></div>
          <p>{description.length > 50 ? description.slice(0, 50) + "..." : description}</p>
          <div className="quiz-buttons">
            <button className="scoreboard-button" onClick={() => toScoreboard(id)}><span>לוח תוצאות</span></button>
            <div>
              <button className="emoji-buttons" onClick={() => copyQuizLink(id)}><img src={LinkSvg} alt="copy link" /></button>
              <button className="emoji-buttons" onClick={() => toEdit(id)}><img src={EditSvg} alt="edit" /></button>
              <button className="emoji-buttons" onClick={() => deleteQuiz(id)}><img src={TrashSvg} alt="trash" /></button>

            </div>
          </div>
        </div>

        {/* copy popup button is here, activated only when button is pressed */}

      </div>
    );
  }
  else {
    return (<div className="quiz">
      <div className="quiz-image" style={{ backgroundImage: `url('${imageUrl}')`, backgroundSize: "cover" }}>
        <span className="answers">{questions.length} תשובות</span>
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
        <div className="quiz-title">{title}</div>
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
          <MenuItem className="quiz-menu-item" onClick={handleClose}><div className="emojiButtons" onClick={() => copyQuizLink(id)}><img src={LinkSvg} alt="link" /><span>שליחת קישור למשחק</span></div></MenuItem>
          <MenuItem className="quiz-menu-item" onClick={handleClose}><div className="emojiButtons" onClick={() => toEdit(id)}><img src={EditSvg} alt="edit" /><span>עריכת משחק</span></div></MenuItem>
          <MenuItem className="quiz-menu-item" onClick={handleClose}> <div className="emojiButtons" onClick={() => deleteQuiz(id)}><img src={TrashSvg} alt="trash" /><span>מחיקת משחק</span></div></MenuItem>

        </Menu>
        
      </div>
      {/* copy popup button is here, activated only when button is pressed */}
    </div>)
  }
}

export default Quiz;