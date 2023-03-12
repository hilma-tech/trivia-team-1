import React, { createContext, ReactNode, FC, useState, useContext, useEffect } from "react"
import { useMediaQuery } from "@mui/material";
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import happyMonkey from '../../images/popUps/happyMonkey.png'
import confettiGif from '../../images/popUps/confettiGif.gif'
import savedMonkey from '../../images/popUps/savedMonkey.svg'
import { GenericPopActions, GenericPopContent, GenericPopTitle } from './GenericPopParts';
import { PopUpType } from "./GenericPopParts";


export type PopupsPropType = 'finishedQuiz' | 'savedSuccessfully' | 'copyQuiz' | 'deleteQuiz' | 'exitGame' | 'saveChanges'


interface PopContextInterface {
  setDeletedQuizId: React.Dispatch<React.SetStateAction<number>>;
  deletedQuizId: number;
  setPopOpen: React.Dispatch<React.SetStateAction<boolean>>;
  popOpen: boolean;
  popHandleClickOpen: () => void;
  popHandleClose: () => void;
  setPopType: React.Dispatch<React.SetStateAction<PopUpType>>;
  setCorrectAnswers: React.Dispatch<React.SetStateAction<number>>;
  setNumOfQuestions: React.Dispatch<React.SetStateAction<number>>;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  correctAnswers: number;
  numOfQuestions: number;
  score: number;

}

interface PopProviderProps {
  children: ReactNode;
}

const popContext = createContext<PopContextInterface | null>(null);


export const PopContextProvider: FC<PopProviderProps> = ({ children }) => {
  const [popOpen, setPopOpen] = useState<boolean>(false);
  const [deletedQuizId, setDeletedQuizId] = useState<number>(-1);
  const [popType, setPopType] = useState<PopUpType>(PopUpType.CopyQuiz);
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);
  const [numOfQuestions, setNumOfQuestions] = useState<number>(0);
  const [score, setScore] = useState<number>(0);

  const isMobile = useMediaQuery('(max-width:600px)')

  function popHandleClickOpen() {
    setPopOpen(true);
  };

  const popHandleClose = () => {
    setPopOpen(false);
  };

  const contextValue: PopContextInterface = {
    setPopOpen: setPopOpen,
    popOpen: popOpen,
    setDeletedQuizId: setDeletedQuizId,
    deletedQuizId: deletedQuizId,
    popHandleClickOpen: popHandleClickOpen,
    popHandleClose: popHandleClose,
    setPopType: setPopType,
    setCorrectAnswers: setCorrectAnswers,
    setNumOfQuestions: setNumOfQuestions,
    setScore: setScore,
    correctAnswers: correctAnswers,
    numOfQuestions: numOfQuestions,
    score: score
  }

  return (

    <popContext.Provider value={contextValue}>
      <>
        {popType === PopUpType.FinishedQuiz && popOpen && <img id='confetti' src={confettiGif} />}
        <Dialog
          className="generic-pop-up-dialog"
          open={popOpen}
          onClose={popHandleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          {isMobile && popType === PopUpType.FinishedQuiz && <img className='mobile-end-game-monkey' src={happyMonkey} />}
          {isMobile && popType === PopUpType.SavedSuccessfully && <img className='mobile-end-game-monkey' src={savedMonkey} />}
          <DialogTitle className="alert-dialog-title" sx={{ '& .MuiTypography-root': { fontSize: '2rem' } }} >
            <GenericPopTitle correctAnswers={correctAnswers} numOfQuestions={numOfQuestions} type={popType} />
          </DialogTitle>
          <DialogContent className='dialog-content-container'>
            <DialogContentText id="alert-dialog-description" className={isMobile ? "dialog-content-text-style" : ""}  >
              <GenericPopContent type={popType} score={score} />
            </DialogContentText>
          </DialogContent>
          <DialogActions className='dialog-actions-container'>
            <GenericPopActions type={popType} />
          </DialogActions>
        </Dialog>
      </>
      {children}
    </popContext.Provider>
  )
}

export const usePopContext = () => {
  const result = useContext(popContext);

  if (result === null) throw new Error("You forgot to put the PopContextProvider!");

  return result;
}