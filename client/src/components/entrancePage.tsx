import { useEffect, useState } from 'react';
import '../style/entrancePage.scss'
import monkeyEnter from '../images/monkeyEnter.svg';
import magicWand from '../images/magic-wand.svg';
import logout from '../images/logout.svg';
import leavesEnterance from '../images/leaves-enterance.svg';
import { useNavigate } from 'react-router-dom';
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
        <div>
            {window.screen.width > 600 ?
                <div className='entrancePage'>
                    <h1>חידונים מטורפים</h1>
                    <h2 className='descripEnter'>בחנו את החברים שלכם בטריוויה שאתם יצרתם!</h2>
                    <div className='entranceContainerDiv'>
                        <h2 className='userHello'>{`שלום, ${currentUser}`}</h2>
                        <div className='entranceButtonDiv'>
                            <button onClick={toEditQuiz}><img src={magicWand} alt='new quiz'></img> צור חידון חדש</button>
                            <button onClick={toMyQuizes}>החידונים שלי</button>
                        </div>
                        <div className='monkeyEnterPic'>
                            <img src={monkeyEnter} alt='monkey'></img>
                        </div>
                    </div>
                    <button onClick={toLogin} className='logoutButton'><img className='logoutPic' src={logout} alt='logout'></img> יציאה</button>
                </div> :
                <div className='entrancePageMobile'>
                    <div className='leavesEnterance'>
                    <img src={leavesEnterance}/>
                    </div>
                    <h2>משחק</h2>
                    <h1>טריוויה</h1>
                    <div>
                        <button onClick={toEditQuiz}><img src={magicWand} alt='new quiz'></img> צור חידון</button>
                    </div>
                    <div>
                        <button onClick={toMyQuizes}>החידונים שלי</button>
                    </div>
                    <div className='monkeyEnterPic'>
                        <img src={monkeyEnter} alt='monkey'></img>
                    </div>
                </div>}
        </div>);
}

export default EnterancePage;