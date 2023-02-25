import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { usePopContext } from './popContext';
import { FC } from 'react';
import happyMonkey from '../../images/popUps/happyMonkey.png'
import '../../style/popups.scss'
import { Link, Typography } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import HomeIcon from '@mui/icons-material/Home';
import confettiGif from '../../images/popUps/confettiGif.gif'
import savedMonkey from '../../images/popUps/savedMonkey.svg'


const isMobile = window.innerWidth < 600
export const boldButtonPopStyle = isMobile ?
  { marginLeft: '2vw', width: '30vw', paddingRight: 0, borderRadius: '10px', height: '5vh', paddingLeft: 0, fontSize: '1rem', fontWeight: 'bolder' }
  : {
    width: '12vh', fontWeight: 'bolder', borderRadius: '50px', height: '3.6vh', fontSize: '1.5rem'
  }
export const iconStyle = { fontSize: '1.3rem', marginLeft: '2%' };
const GenericPop: FC<{ type: string }> = ({ type }) => {

  const { setPopOpen, popOpen, popHandleClickOpen, popHandleClose } = usePopContext();

  const dialogActionsStyles = isMobile ? { display: 'flex', justifyContent: 'center', paddingBottom: '5vh' } : { display: 'flex', justifyContent: 'flex-end', paddingBottom: '3vh' }
  const alignCenterInMobile = isMobile ? { textAlign: 'center' } : {}
  const dialogContentTextStyle = isMobile ? { fontSize: '1.3rem', textAlign: 'center' } : { fontSize: '1.3rem' }
  const roundedButton = isMobile ? { height: '4.2vh', fontSize: '1.2rem', width: '30vw', borderRadius: '80px' } : boldButtonPopStyle
  const containerStyle = isMobile ? {
    backgroundColor: "white",
    boxShadow: 'rgba(99, 99, 99, 0.1) 0px 2px 8px 0px',
    borderRadius: '15px',
  } : {
    backgroundColor: "white",
    boxShadow: 'rgba(99, 99, 99, 0.1) 0px 2px 8px 0px',
    width: '40vw',
    borderRadius: '15px',
    paddingRight: '1.5vh',
    height: '30vh',
    paddingLeft: '1.5vw'

  }

  return (
    <>
      {type === "finishedQuiz" && popOpen && <img id='confetti' src={confettiGif} />}
      <Dialog
        PaperProps={{
          style: containerStyle
        }}
        open={popOpen}
        onClose={popHandleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          '& .MuiPaper-elevation': {
            overflow: 'visible',
            paddingTop: '3vh',
          }
        }}
      >
        {isMobile && type === "finishedQuiz" && <img className='mobile-end-game-monkey' src={happyMonkey} />}
        {isMobile && type === "savedSuccessfully" && <img className='mobile-end-game-monkey' src={savedMonkey} />}
        <DialogTitle id="alert-dialog-title" sx={{ '& .MuiTypography-root': { fontSize: '2rem' } }} >
          {type === "savedSuccessfully" && <Typography variant='h1' sx={alignCenterInMobile}>נשמר בהצלחה!</Typography>}
          {type === "finishedQuiz" && <Typography variant='h1' sx={alignCenterInMobile}>הצלחת 2 מתוך  4</Typography>}
          {type === "copyQuiz" && <Typography variant='h1' sx={alignCenterInMobile}>הקישור הועתק</Typography>}
          {type === "deleteQuiz" && <Typography variant='h1' sx={alignCenterInMobile}>האם אתה בטוח?</Typography>}
          {type === "saveChanges" && <Typography variant='h1' sx={alignCenterInMobile}>שים לב</Typography>}
          {type === "exitGame" && <Typography id="exit-header" variant="body1" sx={{ ...alignCenterInMobile }}>האם אתה בטוח שברצונך לצאת מהמשחק</Typography>}
        </DialogTitle>
        <DialogContent >
          <DialogContentText id="alert-dialog-description" sx={{ '& .MuiTypography-root': { dialogContentTextStyle } }} >
            {type === "savedSuccessfully" && <Typography variant='body1' sx={alignCenterInMobile}>תוכלו לראות את החידונים במאגר החידונים שלכם ולשתף אותו לחברים</Typography>}
            {type === "finishedQuiz" && <Typography variant="body1" sx={{ ...alignCenterInMobile, fontWeight: 'bolder' }}> ציונך: 50</Typography>}
            {type == "copyQuiz" && <Typography variant="body1" sx={alignCenterInMobile}>מצוין! עכשיו אתה יכול לשתף את החידון שלך עם חברים</Typography>}
            {type == "deleteQuiz" && <Typography variant="body1" sx={alignCenterInMobile}>אם תמחק את החידון לא יהיה ניתן לשחק בו והנתונים שאספת ימחק</Typography>}
            {type === "saveChanges" && <Typography variant="body1" sx={alignCenterInMobile}> אם תשמור את השינויים לוח התוצאות שלך יתאפס</Typography>}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={dialogActionsStyles}>

          {isMobile && type !== "copyQuiz" && type !== "savedSuccessfully" && type !== "finishedQuiz" && <Link color="primary" sx={{ display: 'flex', justifyContent: 'center', width: '30vw', fontWeight: 'bolder' }} onClick={popHandleClose}>ביטול</Link>}
          {!isMobile && type !== "copyQuiz" && type !== "finishedQuiz" && <Link color="primary" sx={{ marginLeft: '1.5vw', fontWeight: 'bolder' }} onClick={popHandleClose}>ביטול</Link>}
          {type !== "finishedQuiz" && type !== "savedSuccessfully" && <Button sx={{ ...roundedButton }} id="computer-confirmation-btn" variant="contained" color="primary" onClick={popHandleClose}>אישור</Button>}
          {(type === "finishedQuiz" || type === "savedSuccessfully") &&
            <div>
              <Button sx={boldButtonPopStyle} variant="contained" color="primary"><ShareIcon sx={{ ...iconStyle }} />שתף תוצאה</Button>
              <Button sx={boldButtonPopStyle} variant="contained" color="secondary" onClick={popHandleClose}><HomeIcon sx={iconStyle} />עמוד הבית</Button>
            </div>}

        </DialogActions>
      </Dialog>
    </>
  );

}

export default GenericPop;