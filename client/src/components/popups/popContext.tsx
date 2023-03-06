import React, { createContext, ReactNode, FC, useState, useContext, useEffect } from "react"
import { useMediaQuery } from "@mui/material";
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { GenericPopActions, GenericPopContent, GenericPopTitle } from './GenericPopParts';
import happyMonkey from '../../images/popUps/happyMonkey.png'
import confettiGif from '../../images/popUps/confettiGif.gif'
import savedMonkey from '../../images/popUps/savedMonkey.svg'

export type PopupsPropType = 'finishedQuiz'| 'savedSuccessfully'| 'copyQuiz'| 'deleteQuiz'| 'exitGame'| 'saveChanges'

interface PopContextInterface {
  setDeletedQuizId:React.Dispatch<React.SetStateAction<number>>;
  deletedQuizId:number;
  setPopOpen: React.Dispatch<React.SetStateAction<boolean>>;
  popOpen: boolean;
  popHandleClickOpen: () => void;
  popHandleClose: () => void;
  setPopType: React.Dispatch<React.SetStateAction<"finishedQuiz" | "savedSuccessfully" | "copyQuiz" | "deleteQuiz" | "exitGame" | "saveChanges">>;
}

interface PopProviderProps {
  children: ReactNode;
}

const popContext = createContext<PopContextInterface | null>(null);


export const PopContextProvider: FC<PopProviderProps> = ({ children }) => {
  const [popOpen, setPopOpen] = useState<boolean>(false);
  const [deletedQuizId, setDeletedQuizId] = useState<number>(-1);
  const [popType, setPopType] = useState<PopupsPropType>('copyQuiz')

  const isMobile = useMediaQuery('(max-width:600px)')

   function popHandleClickOpen(){
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
    setPopType: setPopType

  }

  return (

    <popContext.Provider value={contextValue}>
      <>
        {popType === "finishedQuiz" && popOpen && <img id='confetti' src={confettiGif} />}
        <Dialog
          className="generic-pop-up-dialog"
          open={popOpen}
          onClose={popHandleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          {isMobile && popType === "finishedQuiz" && <img className='mobile-end-game-monkey' src={happyMonkey} />}
          {isMobile && popType === "savedSuccessfully" && <img className='mobile-end-game-monkey' src={savedMonkey} />}
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