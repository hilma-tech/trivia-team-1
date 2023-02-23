import '../style/entrancePage.scss'
import {useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, useMediaQuery } from '@mui/material';

import monkeyEnter from '../images/monkeyEnter.svg';
import magicWand from '../images/magic-wand.svg';
import logout from '../images/logout.svg';
import leavesEnterance from '../images/leaves-enterance.svg';

function EnterancePage() {
    const [currentUser, setCurrentUser] = useState('שלימזי')
    const navigate = useNavigate()
    const isLargeScreen = useMediaQuery("(min-width: 600px)")
    function toMyQuizes() {
        navigate('/my-quizzes')
    }


    function toEditQuiz() {
        navigate('/edit-quiz')
    }

    function toLogin() {
        navigate('/login')
    }

    return (
        isLargeScreen ?
            <div className='comp-children-container entrance-page'>
                <h1 className='main-enterance-header'>חידונים מטורפים</h1>
                <h2 className='descrip-enter'>בחנו את החברים שלכם בטריוויה שאתם יצרתם!</h2>
                <div className='entrance-container-div'>
                    <div className='entrance-button-div'>
                        <h2 className='user-hello'>{`שלום, ${currentUser}`}</h2>
                        <Button className='enterance-page-button create-quiz-button' color='primary' variant='contained' onClick={toEditQuiz}><img src={magicWand} alt='new quiz' /> צור חידון חדש</Button>
                        <Button className='enterance-page-button my-quizes-button' color='secondary' variant='contained' onClick={toMyQuizes}>החידונים שלי</Button>
                    </div>
                    <div className='monkey-enter-pic'>
                        <img src={monkeyEnter} alt='monkey' />
                    </div>
                </div>
                <Button onClick={toLogin} className='enterance-page-button  logout-button'><img className='logout-pic' src={logout} alt='logout' /> יציאה</Button>
            </div> :
            <div className='entrance-page-mobile'>
                <div className='leaves-enterance'>
                    <img src={leavesEnterance} alt='leaves' />
                </div>
                <header>
                    <div className='small-header'>משחק</div>
                    <div className='big-header'>טריוויה</div>
                </header>
                <div>
                    <Button className='enterance-page-button create-quiz-button' color='primary' variant='contained' onClick={toEditQuiz}><img src={magicWand} alt='new quiz' /> צור חידון</Button>
                </div>
                <div>
                    <Button className='enterance-page-button my-quizes-button' color='secondary' variant='contained' onClick={toMyQuizes}>החידונים שלי</Button>
                </div>
                <Button onClick={toLogin} className='enterance-page-button logout-button'><img className='logout-pic' src={logout} alt='logout' /> יציאה</Button>
                <div className='monkey-enter-pic'>
                    <img src={monkeyEnter} alt='monkey' />
                </div>
            </div>
    );
}

export default EnterancePage;