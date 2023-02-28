import { FC } from 'react';
import { usePopContext } from './popContext';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import useMediaQuery from '@mui/material/useMediaQuery';
import DialogTitle from '@mui/material/DialogTitle';
import happyMonkey from '../../images/popUps/happyMonkey.png'
import confettiGif from '../../images/popUps/confettiGif.gif'
import savedMonkey from '../../images/popUps/savedMonkey.svg'
import { GenericPopActions, GenericPopContent, GenericPopTitle } from './GenericPopParts';
import '../../style/popups.scss'

export type PopupsPropType = 'finishedQuiz' | 'savedSuccessfully' | 'copyQuiz' | 'deleteQuiz' | 'exitGame' | 'saveChanges'


const GenericPop: FC<{ type: PopupsPropType }> = ({ type }) => {
  const isMobile = useMediaQuery('(max-width:600px)')
  const { popOpen, popHandleClose } = usePopContext();
  return (
    <>
      {type === "finishedQuiz" && popOpen && <img id='confetti' src={confettiGif} />}
      <Dialog
        className="generic-pop-up-dialog"
        open={popOpen}
        onClose={popHandleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {isMobile && type === "finishedQuiz" && <img className='mobile-end-game-monkey' src={happyMonkey} />}
        {isMobile && type === "savedSuccessfully" && <img className='mobile-end-game-monkey' src={savedMonkey} />}
        <DialogTitle id="alert-dialog-title" sx={{ '& .MuiTypography-root': { fontSize: '2rem' } }} >
          <GenericPopTitle type={type} />
        </DialogTitle>
        <DialogContent className='dialog-content-container'>
          <DialogContentText id="alert-dialog-description" className={isMobile ? "dialog-content-text-style" : ""}  >
            <GenericPopContent type={type} />
          </DialogContentText>
        </DialogContent>
        <DialogActions className='dialog-actions-container'>
          <GenericPopActions type={type} />
        </DialogActions>
      </Dialog>
    </>
  );

}

export default GenericPop;