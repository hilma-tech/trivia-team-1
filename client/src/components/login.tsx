import '../style/login.scss'
import leavesEnterance from '../images/leaves-enterance.svg';
import monkeyEnter from '../images/monkeyEnter.svg';
import { useState } from 'react';
function Login() {
    let [username,setUsername] = useState('')
    let [password,setPassword] = useState('')
    let [regErrDiv, setRegErrDiv] = useState('')


    function enterUsernameErr() {
        setRegErrDiv("שכחת להכניס משתמש!")
    }

    function regPassErr() {
        setRegErrDiv("שכחת להזין סיסמא!")
    }


    return (
        window.screen.width > 600 ?
            <div className='login'>
                <h1>חידונים מטורפים</h1>
                <h2 className='descripEnter'>בחנו את החברים שלכם בטריוויה שאתם יצרתם!</h2>
                <div className='entranceContainerDiv'>
                    <form className='loginForm'>
                        <p>שם משתמש</p>
                        <input id='username' type='text' value={username} onInvalid={enterUsernameErr} onChange={(e)=>setUsername(e.target.value)} required maxLength={16}/>
                        <p>סיסמה</p>
                        <input id='newPass' type='password'  value={password} onInvalid={regPassErr}  onChange={(e)=>setPassword(e.target.value)} required maxLength={16}/>
                        <br />
                        <button className='loginSubmitButton' type='submit'>הרשמה</button>
                        <br />
                        <div className='toRegisterLink'>
                            <a href='Register'>עוד לא משתמש רשום? <u>הרשם כאן</u></a>
                        </div>
                        <div className='regErrDiv'>{regErrDiv}</div>
                    </form>
                    <div className='monkeyEnterPic'>
                        <img src={monkeyEnter} alt='monkey'></img>
                    </div>
                </div>
            </div> :
            <div className='loginMobile'>
                <div className='leavesEnterance'>
                    <img src={leavesEnterance} />
                </div>
                <h2>משחק</h2>
                <h1>טריוויה</h1>
                <form className='loginForm'>
                    <div>שם משתמש</div>
                    <input id='username' type='text' value={username} onInvalid={enterUsernameErr} onChange={(e)=>setUsername(e.target.value)} required maxLength={16}/>
                    <div>סיסמה</div>
                    <input id='newPass' type='password' value={password} onInvalid={regPassErr}  onChange={(e)=>setPassword(e.target.value)} required maxLength={16}/>
                    <br />
                    <button className='loginSubmitButton' type='submit'>הרשמה</button>
                    <br/>
                    <a href='Register'>עוד לא משתמש רשום? <u>הרשם כאן</u></a>
                <div className='regErrDiv'>{regErrDiv}</div>
                </form>
                
                <div className='monkeyEnterPic'>
                    <img src={monkeyEnter} alt='monkey'></img>
                </div>
            </div>);
}

export default Login;