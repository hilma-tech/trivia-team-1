import { useEffect, useState } from 'react';
import '../style/entrancePage.scss'
import monkeyEnter from '../images/monkeyEnter.svg';
import magicWand from '../images/magic-wand.svg';
import logout from '../images/logout.svg';
import leavesEnterance from '../images/leaves-enterance.svg';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
function EnterancePage() {
    let [currentUser, setCurrentUser] = useState('שלימזי')
    const navigate = useNavigate()
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
            <div className='entrancePage'>
                <h1>חידונים מטורפים</h1>
                <h2 className='descripEnter'>בחנו את החברים שלכם בטריוויה שאתם יצרתם!</h2>
                <div className='entranceContainerDiv'>
                    <div className='entranceButtonDiv'>
                        <h2 className='userHello'>{`שלום, ${currentUser}`}</h2>
                        <Button className='createQuizButton' color='primary' variant='contained' onClick={toEditQuiz}><img src={magicWand} alt='new quiz'></img> צור חידון חדש</Button>
                        <Button className='myQuizesButton' color='secondary' variant='contained' onClick={toMyQuizes}>החידונים שלי</Button>
                    </div>
                    <div className='monkeyEnterPic'>
                        <img src={monkeyEnter} alt='monkey'></img>
                    </div>
                </div>
                <Button onClick={toLogin} className='logoutButton'><img className='logoutPic' src={logout} alt='logout'></img> יציאה</Button>
            </div> :
            <div className='entrancePageMobile'>
                <div className='leavesEnterance'>
                    <img src={leavesEnterance}/>
                </div>
                <h2>משחק</h2>
                <h1>טריוויה</h1>
                <div>
                    <Button className='createQuizButton' color='primary' variant='contained' onClick={toEditQuiz}><img src={magicWand} alt='new quiz'></img> צור חידון</Button>
                </div>
                <div>
                    <Button className='myQuizesButton' color='secondary' variant='contained' onClick={toMyQuizes}>החידונים שלי</Button>
                </div>
                <Button onClick={toLogin} className='logoutButton'><img className='logoutPic' src={logout} alt='logout'></img> יציאה</Button>
                <div className='monkeyEnterPic'>
                    <img src={monkeyEnter} alt='monkey'></img>
                </div>
            </div>
    );
}

export default EnterancePage;