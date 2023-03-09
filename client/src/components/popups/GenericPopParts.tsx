import { FC } from 'react';
import { Link, Typography } from '@mui/material';
import { usePopContext } from './popContext';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import useMediaQuery from '@mui/material/useMediaQuery';
import ShareIcon from '@mui/icons-material/Share';
import { useNavigate } from 'react-router-dom';
import { PopupsPropType } from './popContext';
import '../../style/popups.scss'
import axios, { AxiosResponse } from 'axios';
 

export enum Type {
    SavedSuccessfully = "savedSuccessfully",
    FinishedQuiz = "finishedQuiz",
    ExitGame = "exitGame",
    SaveChanges = 'saveChanges',
    DeleteQuiz = 'deleteQuiz',
    CopyQuiz = 'copyQuiz'
}

export const GenericPopTitle: FC<{ type: Type }> = ({ type }) => {

    switch (type) {
        case Type.SavedSuccessfully:
            return <Typography className='pop-title' variant='h1'>נשמר בהצלחה!</Typography>

        case Type.FinishedQuiz:
            return <Typography className='pop-title'variant='h1'>הצלחת 2 מתוך  4</Typography>

        case Type.ExitGame:
            return <Typography className='pop-title' variant="h1">האם אתה בטוח שברצונך לצאת מהמשחק</Typography>

        case Type.SaveChanges:
            return <Typography className='pop-title' variant='h1'>שים לב</Typography>

        case Type.DeleteQuiz:
            return <Typography className='pop-title' variant='h1'>האם אתה בטוח?</Typography>

        case Type.CopyQuiz:
            return <Typography className='pop-title' variant='h1'>הקישור הועתק</Typography>
        
    }
}


export const GenericPopContent: FC<{ type: Type }> = ({ type }) => {
    switch (type) {
        case Type.SavedSuccessfully:
            return <Typography className='pop-content' variant='body1'>תוכלו לראות את החידונים במאגר החידונים שלכם ולשתף אותו לחברים</Typography>

        case Type.FinishedQuiz:
            return <Typography className='pop-content' variant="body1" sx={{ fontWeight: 'bolder' }}> ציונך: 50</Typography>

        case Type.SaveChanges:
            return <Typography className='pop-content' variant="body1"> אם תשמור את השינויים לוח התוצאות שלך יתאפס</Typography>

        case Type.DeleteQuiz:
            return <Typography className='pop-content' variant="body1">אם תמחק את החידון לא יהיה ניתן לשחק בו והנתונים שאספת ימחקו</Typography>

        case Type.CopyQuiz:
            return <Typography className='pop-content' variant="body1">מצוין! עכשיו אתה יכול לשתף את החידון שלך עם חברים</Typography>

        case Type.ExitGame:
            return <p></p>

        
    }
}

export const GenericPopActions: FC<{ type: Type }> = ({ type }) => {
    const { popHandleClose, deletedQuizId, setDeletedQuizId } = usePopContext();
    const navigate = useNavigate();
    const isMobile = useMediaQuery('(max-width:600px)');

    const onClickGoToHomePage = () => {
        popHandleClose();
        navigate('/enterance-page')
    }
       async function deleteQuiz(id:number){
        await axios.delete(`api/quiz/${id}`);
        setDeletedQuizId(0);
    }

    switch (type) {
        case Type.SavedSuccessfully:
        case Type.FinishedQuiz:
            return <div>
                <Button className='boldButtonPopStyle' variant="contained" color="primary"><ShareIcon className='iconStyle' />{type === 'finishedQuiz' ? "שתף תוצאה" : "שתף כעת"}</Button>
                <Button className='boldButtonPopPopupsPropTypeStyle' variant="contained" color="secondary" onClick={onClickGoToHomePage}><HomeIcon className='iconStyle' />עמוד הבית</Button>
            </div>

        case Type.SaveChanges:
        case Type.DeleteQuiz:
        case Type.ExitGame:
            return <div className='action-injected'>
                <Link color="primary" className='action-link' onClick={popHandleClose}>ביטול</Link>
                <Button className={isMobile ? "roundedButton" : "boldButtonPopStyle"} id="computer-confirmation-btn" variant="contained" color="primary" onClick={()=>{popHandleClose()
                if(type === Type.DeleteQuiz){
                    deleteQuiz(deletedQuizId)
                }}}>אישור</Button>
            </div>

        case Type.CopyQuiz:
            return <Button className={isMobile ? "roundedButton" : "boldButtonPopStyle"} id="computer-confirmation-btn" variant="contained" color="primary" onClick={popHandleClose}>אישור</Button>
        

    }
}




