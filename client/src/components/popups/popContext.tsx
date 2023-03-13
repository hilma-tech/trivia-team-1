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
import { Type } from "./GenericPopParts";
import { CurrentQuestion } from "../../utils/Interfaces";


export type PopupsPropType = 'finishedQuiz' | 'savedSuccessfully' | 'copyQuiz' | 'deleteQuiz' | 'exitGame' | 'saveChanges'

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
  setPopType: React.Dispatch<React.SetStateAction<Type>>;
  approvedPops: boolean | null;
  toggleApprovedPops: React.Dispatch<React.SetStateAction<boolean | null>>;
}

interface PopProviderProps {
  children: ReactNode;
}

export interface SaveQuiz {
  creatorId: number;
  title: string;
  description: string;
  questions: CurrentQuestion[];
}
const popContext = createContext<PopContextInterface | null>(null);


export const PopContextProvider: FC<PopProviderProps> = ({ children }) => {
  const [popOpen, setPopOpen] = useState<boolean>(false);

  const [deletedQuizId, setDeletedQuizId] = useState<number>(-1);
  const [savedQuiz, setSavedQuiz] = useState<SaveQuiz>();
  const [editedQuizId, setEditedQuizId] = useState<string | undefined>("");
  const [popType, setPopType] = useState<Type>(Type.CopyQuiz);
  const [approvedPops, toggleApprovedPops] = useState<boolean | null>(null);

  const isMobile = useMediaQuery('(max-width:600px)')

  function popHandleClickOpen() {
    setPopOpen(true);
  };

  const popHandleClose = () => {
    setPopOpen(false);
  };

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
    toggleApprovedPops: toggleApprovedPops
  }

  return (

    <popContext.Provider value={contextValue}>
      <>
        {popType === Type.FinishedQuiz && popOpen && <img id='confetti' src={confettiGif} />}
        <Dialog
          className="generic-pop-up-dialog"
          open={popOpen}
          onClose={popHandleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          {isMobile && popType === Type.FinishedQuiz && <img className='mobile-end-game-monkey' src={happyMonkey} />}
          {isMobile && popType === Type.SavedSuccessfully && <img className='mobile-end-game-monkey' src={savedMonkey} />}
          <DialogTitle className="alert-dialog-title" sx={{ '& .MuiTypography-root': { fontSize: '2rem' } }} >
            <GenericPopTitle type={popType} />
          </DialogTitle>
          <DialogContent className='dialog-content-container'>
            <DialogContentText id="alert-dialog-description" className={isMobile ? "dialog-content-text-style" : ""}  >
              <GenericPopContent type={popType} />
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