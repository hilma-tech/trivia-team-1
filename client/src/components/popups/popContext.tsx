import React, { createContext, ReactNode, FC, useState, useContext } from "react"
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


interface PopContextInterface {
  setDeletedQuizId: React.Dispatch<React.SetStateAction<number>>;
  deletedQuizId: number;
  setEditedQuizId: React.Dispatch<React.SetStateAction<string | undefined>>;
  editedQuizId: string | undefined;
  setSavedQuiz: React.Dispatch<React.SetStateAction<SaveQuiz | undefined>>;
  savedQuiz: SaveQuiz | undefined;
  setPopOpen: React.Dispatch<React.SetStateAction<boolean>>;
  popOpen: boolean;
  popHandleClickOpen: () => void;
  popHandleClose: () => void;
  popAlwaysClose: () => void;
  setPopType: React.Dispatch<React.SetStateAction<PopUpType>>;
  approvedPops: boolean | null;
  toggleApprovedPops: React.Dispatch<React.SetStateAction<boolean | null>>;
  setCorrectAnswers: React.Dispatch<React.SetStateAction<number>>;
  setNumOfQuestions: React.Dispatch<React.SetStateAction<number>>;
  correctAnswers: number;
  numOfQuestions: number;
}

interface PopProviderProps {
  children: ReactNode;

}

export interface ServerAnswer {
  text: string;
  isCorrect: boolean;
  imageUrl?: number | string;
}

export interface ServerQuestion {
  title: string;
  answers: ServerAnswer[];
  imageUrl?: number | string;
}

export interface SaveQuiz {
  creatorId: string;
  title: string;
  imageUrl?: number | string;
  description: string;
  questions: ServerQuestion[];
}
const popContext = createContext<PopContextInterface | null>(null);


export const PopContextProvider: FC<PopProviderProps> = ({ children }) => {
  const [popOpen, setPopOpen] = useState<boolean>(false);

  const [deletedQuizId, setDeletedQuizId] = useState<number>(-1);
  const [savedQuiz, setSavedQuiz] = useState<SaveQuiz>();
  const [editedQuizId, setEditedQuizId] = useState<string | undefined>("");
  const [approvedPops, toggleApprovedPops] = useState<boolean | null>(null);
  const [popType, setPopType] = useState<PopUpType>(PopUpType.CopyQuiz);
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);
  const [numOfQuestions, setNumOfQuestions] = useState<number>(0);


  const isMobile = useMediaQuery('(max-width:600px)')

  function popHandleClickOpen() {
    setPopOpen(true);
  };

  const popHandleClose = () => {
    if (popType !== PopUpType.FinishedQuiz) setPopOpen(false);
  };

  const popAlwaysClose = () => {
    setPopOpen(false);
  }

  const contextValue: PopContextInterface = {
    setEditedQuizId: setEditedQuizId,
    editedQuizId: editedQuizId,
    setPopOpen: setPopOpen,
    popOpen: popOpen,
    setDeletedQuizId: setDeletedQuizId,
    deletedQuizId: deletedQuizId,
    setSavedQuiz: setSavedQuiz,
    savedQuiz: savedQuiz,
    popHandleClickOpen: popHandleClickOpen,
    popHandleClose: popHandleClose,
    setPopType: setPopType,
    approvedPops: approvedPops,
    toggleApprovedPops: toggleApprovedPops,
    setCorrectAnswers: setCorrectAnswers,
    setNumOfQuestions: setNumOfQuestions,
    correctAnswers: correctAnswers,
    numOfQuestions: numOfQuestions,
    popAlwaysClose: popAlwaysClose
  }

  return (

    <popContext.Provider value={contextValue}>
      <>
        {popType === PopUpType.FinishedQuiz && popOpen && <img id='confetti' src={confettiGif} alt='confetti'/>}
        <Dialog
          className="generic-pop-up-dialog"
          open={popOpen}
          onClose={popHandleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          {isMobile && popType === PopUpType.FinishedQuiz && <img className='mobile-end-game-monkey' src={happyMonkey} alt='happy monkey' />}
          {isMobile && popType === PopUpType.SavedSuccessfully && <img className='mobile-end-game-monkey' src={savedMonkey} alt='approving monkey'/>}
          <DialogTitle className="alert-dialog-title" sx={{ '& .MuiTypography-root': { fontSize: '2rem' } }} >
            <GenericPopTitle correctAnswers={correctAnswers} numOfQuestions={numOfQuestions} type={popType} />
          </DialogTitle>
          <DialogContent className='dialog-content-container'>
            <DialogContentText id="alert-dialog-description" className={isMobile ? "dialog-content-text-style" : ""}  >
              <GenericPopContent type={popType} correctAnswers={correctAnswers} numOfQuestions={numOfQuestions} />
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