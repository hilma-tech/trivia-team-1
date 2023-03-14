import { FC } from 'react';
import { Link, Typography } from '@mui/material';
import { usePopContext } from './popContext';
import { copyScoreBoardLink } from '../../common/functions/copyScoreBoardLink';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import useMediaQuery from '@mui/material/useMediaQuery';
import ShareIcon from '@mui/icons-material/Share';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import '../../style/popups.scss'
import { usePlayerName } from '../../context/PlayerNameContext';


export enum PopUpType {
    SavedSuccessfully = "savedSuccessfully",
    FinishedQuiz = "finishedQuiz",
    ExitGame = "exitGame",
    SaveChanges = 'saveChanges',
    DeleteQuiz = 'deleteQuiz',
    CopyQuiz = 'copyQuiz',
}

interface GenericPopTitleProps {
    type: PopUpType,
    numOfQuestions: number;
    correctAnswers: number;
}

interface GenericPopContentProps {
    type: PopUpType,
    correctAnswers: number;
    numOfQuestions: number

}

export const GenericPopTitle: FC<GenericPopTitleProps> = ({ type, numOfQuestions, correctAnswers }) => {

    switch (type) {
        case PopUpType.SavedSuccessfully:
            return <Typography className='pop-title' variant='h1'>נשמר בהצלחה!</Typography>

        case PopUpType.FinishedQuiz:
            return <Typography className='pop-title' variant='h1'>הצלחת {correctAnswers} מתוך {numOfQuestions}</Typography>

        case PopUpType.ExitGame:
            return <Typography className='pop-title' variant="h1">האם אתה בטוח שברצונך לצאת מהמשחק</Typography>

        case PopUpType.SaveChanges:
            return <Typography className='pop-title' variant='h1'>שים לב</Typography>

        case PopUpType.DeleteQuiz:
            return <Typography className='pop-title' variant='h1'>האם אתה בטוח?</Typography>

        case PopUpType.CopyQuiz:
            return <Typography className='pop-title' variant='h1'>הקישור הועתק</Typography>

    }
}


export const GenericPopContent: FC<GenericPopContentProps> = ({ type, correctAnswers, numOfQuestions }) => {
    switch (type) {
        case PopUpType.SavedSuccessfully:
            return <Typography className='pop-content' variant='body1'>תוכלו לראות את החידונים במאגר החידונים שלכם ולשתף אותו לחברים</Typography>

        case PopUpType.FinishedQuiz:
            return <Typography className='pop-content' variant="body1" sx={{ fontWeight: 'bolder' }}> ציונך: {Math.round(correctAnswers / numOfQuestions * 100)}</Typography>

        case PopUpType.SaveChanges:
            return <Typography className='pop-content' variant="body1"> אם תשמור את השינויים לוח התוצאות שלך יתאפס</Typography>

        case PopUpType.DeleteQuiz:
            return <Typography className='pop-content' variant="body1">אם תמחק את החידון לא יהיה ניתן לשחק בו והנתונים שאספת ימחקו</Typography>

        case PopUpType.CopyQuiz:
            return <Typography className='pop-content' variant="body1">מצוין! עכשיו אתה יכול לשתף את החידון שלך עם חברים</Typography>

        case PopUpType.ExitGame:
            return <p></p>
    }
}

export const GenericPopActions: FC<{ type: PopUpType }> = ({ type }) => {
    const { popHandleClose, deletedQuizId, setDeletedQuizId } = usePopContext();
    const { quizId, playerName } = usePlayerName();
    const navigate = useNavigate();
    const isMobile = useMediaQuery('(max-width:600px)');


    const onClickGoToHomePage = () => {
        popHandleClose();
        navigate('/enterance-page')
    }
    async function deleteQuiz(id: number) {
        await axios.delete(`api/quiz/${id}`);
        setDeletedQuizId(0);
    }

    switch (type) {
        case PopUpType.SavedSuccessfully:
        case PopUpType.FinishedQuiz:
            return <div>
                <Button className='boldButtonPopStyle' variant="contained" color="primary" onClick={() => copyScoreBoardLink(Number(quizId), playerName)} ><ShareIcon className='iconStyle' />{type === 'finishedQuiz' ? "שתף תוצאה" : "שתף כעת"}</Button>
                <Button className='boldButtonPopStyle' variant="contained" color="secondary" onClick={onClickGoToHomePage}><HomeIcon className='iconStyle' />עמוד הבית</Button>
            </div>

        case PopUpType.SaveChanges:
        case PopUpType.DeleteQuiz:
        case PopUpType.ExitGame:
            return <div className='action-injected'>
                <Link color="primary" className='action-link' onClick={popHandleClose}>ביטול</Link>
                <Button className={isMobile ? "roundedButton" : "boldButtonPopStyle"} id="computer-confirmation-btn" variant="contained" color="primary" onClick={() => {
                    popHandleClose()
                    if (type === PopUpType.DeleteQuiz) {
                        deleteQuiz(deletedQuizId)
                    }
                }}>אישור</Button>
            </div>

        case PopUpType.CopyQuiz:
            return <Button className={isMobile ? "roundedButton" : "boldButtonPopStyle"} id="computer-confirmation-btn" variant="contained" color="primary" onClick={popHandleClose}>אישור</Button>


    }
}




