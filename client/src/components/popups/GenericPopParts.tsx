import { FC } from 'react';
import { Link, Typography } from '@mui/material';
import { SaveQuiz, usePopContext } from './popContext';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import useMediaQuery from '@mui/material/useMediaQuery';
import ShareIcon from '@mui/icons-material/Share';
import { useNavigate } from 'react-router-dom';
import { PopupsPropType } from './popContext';
import '../../style/popups.scss'
import axios, { AxiosResponse } from 'axios';
import { SaveOptions } from 'typeorm';


export enum Type {
    SavedSuccessfully = "savedSuccessfully",
    FinishedQuiz = "finishedQuiz",
    ExitGame = "exitGame",
    SaveChanges = 'saveChanges',
    AddQuiz = 'addQuiz',
    DeleteQuiz = 'deleteQuiz',
    CopyQuiz = 'copyQuiz'
}

export const GenericPopTitle: FC<{ type: Type }> = ({ type }) => {

    switch (type) {
        case Type.SavedSuccessfully:
            return <Typography className='pop-title' variant='h1'>נשמר בהצלחה!</Typography>

        case Type.FinishedQuiz:
            return <Typography className='pop-title' variant='h1'>הצלחת 2 מתוך  4</Typography>

        case Type.ExitGame:
            return <Typography className='pop-title' variant="h1">האם אתה בטוח שברצונך לצאת מהמשחק</Typography>

        case Type.SaveChanges:
        case Type.AddQuiz:    
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
        case Type.AddQuiz: 
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
    const { popHandleClose, deletedQuizId, setDeletedQuizId, toggleApprovedPops, savedQuiz, setSavedQuiz, editedQuizId } = usePopContext();
    const navigate = useNavigate();
    const isMobile = useMediaQuery('(max-width:600px)');

    const onClickGoToHomePage = () => {
        popHandleClose();
        navigate('/entrance-page')
    }

    async function deleteQuiz(id: number) {
        await axios.delete(`api/quiz/${id}`);
        setDeletedQuizId(0);
    }

    const handleCancelClick = () => {
        console.log('here')
        toggleApprovedPops(false);
        popHandleClose();
        // toggleApprovedPops(null);
    }
    async function saveNewQuiz(quiz:SaveQuiz | undefined){
        axios.post('http://localhost:8080/api/quiz', quiz)
    }

    async function editQuiz(quiz:SaveQuiz | undefined){
        axios.put(`http://localhost:8080/api/quiz/${editedQuizId}`, quiz)
    }

    const confirmBtnClick = () => {
        toggleApprovedPops(true);
        popHandleClose()
        if (type === Type.DeleteQuiz) {
            deleteQuiz(deletedQuizId)
        }
        else if (type === Type.SaveChanges) {
            editQuiz(savedQuiz)
        }
        else if (type === Type.AddQuiz) {
            saveNewQuiz(savedQuiz)

        }   
    }

    switch (type) {
        case Type.SavedSuccessfully:
        case Type.FinishedQuiz:
            return <div>
                <Button className='boldButtonPopStyle' variant="contained" color="primary"><ShareIcon className='iconStyle' />{type === 'finishedQuiz' ? "שתף תוצאה" : "שתף כעת"}</Button>
                <Button className='boldButtonPopStyle' variant="contained" color="secondary" onClick={onClickGoToHomePage}><HomeIcon className='iconStyle' />עמוד הבית</Button>
            </div>

        case Type.SaveChanges:
        case Type.AddQuiz: 
        case Type.DeleteQuiz:
        case Type.ExitGame:
            return <div className='action-injected'>
                <Link color="primary" className='action-link' onClick={handleCancelClick}>ביטול</Link>
                <Button className={isMobile ? "roundedButton" : "boldButtonPopStyle"} id="computer-confirmation-btn" variant="contained" color="primary" onClick={confirmBtnClick}>אישור</Button>
            </div>

        case Type.CopyQuiz:
            return <Button className={isMobile ? "roundedButton" : "boldButtonPopStyle"} id="computer-confirmation-btn" variant="contained" color="primary" onClick={popHandleClose}>אישור</Button>


    }
}




