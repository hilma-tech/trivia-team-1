import '../style/register.scss'
import leavesEnterance from '../images/leaves-enterance.svg';
import monkeyEnter from '../images/monkeyEnter.svg';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
function Register() {
    let [username, setUsername] = useState('')
    let [password, setPassword] = useState('')
    let [repetPassword, setRepetPassword] = useState('')
    let [regErrDiv, setRegErrDiv] = useState('')
    const navigate = useNavigate()

    async function handleRegisterSubmit(e: React.SyntheticEvent) {
        e.preventDefault()
        // now we need to fetch the users array to check if the username exist if not navigate to login and save it if otherwise change the error to username exists
        alert("You signed up successfully!")
        navigate('/')
    }

    function enterUsernameErr() {
        setRegErrDiv("שכחת להכניס משתמש!")
    }

    function regPassErr() {
        setRegErrDiv("סיסמא צריכה להיות בין 8-16 תווים ולפחות אות ומספר אחד!")
    }

    function repetPassErr() {
        setRegErrDiv("הסיסמא שהזנת אינה תואמת לקודמת!")
    }

    return (
        window.screen.width > 600 ?
            <div className='register'>
                <h1>חידונים מטורפים</h1>
                <h2 className='descripEnter'>בחנו את החברים שלכם בטריוויה שאתם יצרתם!</h2>
                <div className='entranceContainerDiv'>
                    <form className='registerForm'  onSubmit={(e: React.SyntheticEvent) => handleRegisterSubmit(e)}>
                        <p>שם משתמש</p>
                        <input id='username' type='text' value={username} onInvalid={enterUsernameErr} onChange={(e) => setUsername(e.target.value)} required maxLength={16}/>
                        <p>סיסמה</p>
                        <input id='newPass' type='password' value={password} onInvalid={regPassErr} onChange={(e) => setPassword(e.target.value)} required maxLength={16} pattern='^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*+-]{8,16}$' />
                        <p>אימות סיסמה</p>
                        <input id='repetNewPass' type='password' value={repetPassword} onInvalid={repetPassErr} onChange={(e) => setRepetPassword(e.target.value)} required maxLength={16} pattern={password} />
                        <br />
                        <button className='registerSubmitButton' type='submit'>הרשמה</button>
                        <br />
                        <div className='regErrDiv'>{regErrDiv}</div>
                    </form>
                    <div className='monkeyEnterPic'>
                        <img src={monkeyEnter} alt='monkey'></img>
                    </div>
                </div>
            </div> :
            <div className='registerMobile'>
                <div className='leavesEnterance'>
                    <img src={leavesEnterance} />
                </div>
                <h2>משחק</h2>
                <h1>טריוויה</h1>
                <form className='registerForm' onSubmit={(e: React.SyntheticEvent) => handleRegisterSubmit(e)}>
                    <div>שם משתמש</div>
                    <input id='username' type='text' value={username}  onInvalid={enterUsernameErr}  onChange={(e) => setUsername(e.target.value)} required maxLength={16} />
                    <div>סיסמה</div>
                    <input id='newPass' type='password' value={password}  onInvalid={regPassErr} onChange={(e) => setPassword(e.target.value)} required maxLength={16} pattern='^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*+-]{8,16}$' />
                    <div>אימות סיסמה</div>
                    <input id='repetNewPass' type='password' value={repetPassword} onInvalid={repetPassErr} onChange={(e) => setRepetPassword(e.target.value)} required maxLength={16} pattern={password} />
                    <br />
                    <button className='registerSubmitButton' type='submit'>הרשמה</button>
                    <br />
                    <div className='regErrDiv'>{regErrDiv}</div>
                </form>
                <div className='monkeyEnterPic'>
                    <img src={monkeyEnter} alt='monkey'></img>
                </div>
            </div>);
}

export default Register;