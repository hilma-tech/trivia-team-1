import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { usePopContext } from './popContext';
import { FC } from 'react';

const GenericPop: FC<{ type: string }> = ({ type }) => {

  const { setPopOpen, popOpen, popHandleClickOpen, popHandleClose } = usePopContext();


  return (
    <Dialog
      open={popOpen}
      onClose={popHandleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {type === "copyQuiz" && "הקישור הועתק"}
        {type === "deleteQuiz" && "האם אתה בטוח?"}
        {type === "saveChanges" && "שים לב"}
        {type === "exitGame" && "האם אתה בטוח שברצונך לצאת מהמשחק"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {type == "copyQuiz" && 'מצוין! עכשיו אתה יכול לשתף את החידון שלך עם חברים'}
          {type == "deleteQuiz" && 'אם תמחק את החידון לא יהיה ניתן לשחק בו והנתונים שאספת ימחק'}
          {type === "saveChanges" && "אם תשמור את השינויים לוח התוצאות שלך יתאפס"}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {type !== "copyQuiz" && <Button onClick={popHandleClose} autoFocus>
          ביטול
        </Button>}
        <Button variant="contained" color="primary" onClick={popHandleClose}>אישור</Button>
      </DialogActions>
    </Dialog>
  );


}

export default GenericPop;