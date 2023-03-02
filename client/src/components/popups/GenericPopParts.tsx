import { FC } from 'react';
import { Link, Typography } from '@mui/material';
import { usePopContext } from './popContext';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import useMediaQuery from '@mui/material/useMediaQuery';
import ShareIcon from '@mui/icons-material/Share';
import { PopupsPropType } from './GenericPop';
import '../../style/popups.scss'


export const GenericPopTitle: FC<{ type: PopupsPropType }> = ({ type }) => {

    switch (type) {
        case 'savedSuccessfully':
            return <Typography variant='h1'>נשמר בהצלחה!</Typography>

        case 'finishedQuiz':
            return <Typography variant='h1'>הצלחת 2 מתוך  4</Typography>

        case 'exitGame':
            return <Typography variant="h1">האם אתה בטוח שברצונך לצאת מהמשחק</Typography>

        case 'saveChanges':
            return <Typography variant='h1'>שים לב</Typography>

        case 'deleteQuiz':
            return <Typography variant='h1'>האם אתה בטוח?</Typography>

        case 'copyQuiz':
            return <Typography variant='h1'>הקישור הועתק</Typography>
    }
}


export const GenericPopContent: FC<{ type: PopupsPropType }> = ({ type }) => {
    switch (type) {
        case 'savedSuccessfully':
            return <Typography variant='body1'>תוכלו לראות את החידונים במאגר החידונים שלכם ולשתף אותו לחברים</Typography>

        case 'finishedQuiz':
            return <Typography variant="body1" sx={{ fontWeight: 'bolder' }}> ציונך: 50</Typography>

        case 'saveChanges':
            return <Typography variant="body1"> אם תשמור את השינויים לוח התוצאות שלך יתאפס</Typography>

        case 'deleteQuiz':
            return <Typography variant="body1">אם תמחק את החידון לא יהיה ניתן לשחק בו והנתונים שאספת ימחקו</Typography>

        case 'copyQuiz':
            return <Typography variant="body1">מצוין! עכשיו אתה יכול לשתף את החידון שלך עם חברים</Typography>

        case 'exitGame':
            return <p></p>
    }
}

export const GenericPopActions: FC<{ type: PopupsPropType }> = ({ type }) => {
    const { popHandleClose } = usePopContext();
    const isMobile = useMediaQuery('(max-width:600px)')

    switch (type) {
        case 'savedSuccessfully':
        case 'finishedQuiz':
            return <div>
                <Button className='boldButtonPopStyle' variant="contained" color="primary"><ShareIcon className='iconStyle' />{type === 'finishedQuiz' ? "שתף תוצאה" : "שתף כעת"}</Button>
                <Button className='boldButtonPopStyle' variant="contained" color="secondary" onClick={popHandleClose}><HomeIcon className='iconStyle' />עמוד הבית</Button>
            </div>

        case 'saveChanges':
        case 'deleteQuiz':
        case 'exitGame':
            return <div className='action-injected'>
                <Link color="primary"  className='action-link' onClick={popHandleClose}>ביטול</Link>
                <Button className={isMobile ? "roundedButton" : "boldButtonPopStyle"} id="computer-confirmation-btn" variant="contained" color="primary" onClick={popHandleClose}>אישור</Button>
            </div>

        case 'copyQuiz':
            return <Button className={isMobile ? "roundedButton" : "boldButtonPopStyle"} id="computer-confirmation-btn" variant="contained" color="primary" onClick={popHandleClose}>אישור</Button>


    }
}




