import '../style/entrancePage.scss'
import { useEffect, useState } from 'react';
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
        navigate('/my-quizes')
    }


    function toEditQuiz() {
        navigate('/edit-quiz')
    }

    function toLogin() {
        navigate('/login')
    }

    return (
        window.screen.width > 600 ?
            <div className='compChildrenContainer entrancePage'>
                <h1 className='mainEnteranceHeader'>חידונים מטורפים</h1>
                <h2 className='descripEnter'>בחנו את החברים שלכם בטריוויה שאתם יצרתם!</h2>
                <div className='entranceContainerDiv'>
                    <div className='entranceButtonDiv'>
                        <h2 className='userHello'>{`שלום, ${currentUser}`}</h2>
                        <Button className='enterancePageButton createQuizButton' color='primary' variant='contained' onClick={toEditQuiz}><img src={magicWand} alt='new quiz' /> צור חידון חדש</Button>
                        <Button className='enterancePageButton myQuizesButton' color='secondary' variant='contained' onClick={toMyQuizes}>החידונים שלי</Button>
                    </div>
                    <div className='monkeyEnterPic'>
                        <img src={monkeyEnter} alt='monkey' />
                    </div>
                </div>
                <Button onClick={toLogin} className='enterancePageButton logoutButton'><img className='logoutPic' src={logout} alt='logout' /> יציאה</Button>
            </div> :
            <div className='entrancePageMobile'>
                <div className='leavesEnterance'>
                    <img src={leavesEnterance} alt='leaves' />
                </div>
                <header>
                    <div className='smallHeader'>משחק</div>
                    <div className='bigHeader'>טריוויה</div>
                </header>
                <div>
                    <Button className='enterancePageButton createQuizButton' color='primary' variant='contained' onClick={toEditQuiz}><img src={magicWand} alt='new quiz' /> צור חידון</Button>
                </div>
                <div>
                    <Button className='enterancePageButton myQuizesButton' color='secondary' variant='contained' onClick={toMyQuizes}>החידונים שלי</Button>
                </div>
                <Button onClick={toLogin} className='enterancePageButton logoutButton'><img className='logoutPic' src={logout} alt='logout' /> יציאה</Button>
                <div className='monkeyEnterPic'>
                    <img src={monkeyEnter} alt='monkey' />
                </div>
            </div>
    );
}

export default EnterancePage;