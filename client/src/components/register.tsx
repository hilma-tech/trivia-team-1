import '../style/register.scss'
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography } from '@mui/material';

import leavesEnterance from '../images/leaves-enterance.svg';
import monkeyEnter from '../images/monkeyEnter.svg';

function Register() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [repetPassword, setRepetPassword] = useState('')
    const [regErrDiv, setRegErrDiv] = useState('')
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
                <Typography className='mainRegisterHeader' variant='h1'>חידונים מטורפים</Typography>
                <Typography variant='h2' className='descripEnter'>בחנו את החברים שלכם בטריוויה שאתם יצרתם!</Typography>
                <div className='entranceContainerDiv'>
                    <form className='registerForm' onSubmit={(e: React.SyntheticEvent) => handleRegisterSubmit(e)}>
                        <Typography className='loginParag' variant='body1'>שם משתמש</Typography>
                        <input className='registerInput' id='username' type='text' value={username} onInvalid={enterUsernameErr} onChange={(e) => setUsername(e.target.value)} required maxLength={16} />
                        <Typography className='loginParag' variant='body1'>סיסמה</Typography>
                        <input className='registerInput' id='newPass' type='password' value={password} onInvalid={regPassErr} onChange={(e) => setPassword(e.target.value)} required maxLength={16} pattern='^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*+-]{8,16}$' />
                        <Typography className='loginParag' variant='body1'>אימות סיסמה</Typography>
                        <input className='registerInput' id='repetNewPass' type='password' value={repetPassword} onInvalid={repetPassErr} onChange={(e) => setRepetPassword(e.target.value)} required maxLength={16} pattern={password} />

                        <Button color='primary' variant='contained' className='registerSubmitButton' type='submit'>הרשמה</Button>

                        <div className='regErrDiv'>{regErrDiv}</div>
                    </form>
                    <div className='monkeyEnterPic'>
                        <img src={monkeyEnter} alt='monkey' />
                    </div>
                </div>
            </div> :
            <div className='registerMobile'>
                <div className='leavesEnterance'>
                    <img src={leavesEnterance} alt="leaves" />
                </div>
                <header>
                    <div className='smallHeader'>משחק</div>
                    <div className='bigHeader'>טריוויה</div>
                </header>

                <form className='registerForm' onSubmit={(e: React.SyntheticEvent) => handleRegisterSubmit(e)}>
                    <div className='registerLable'>שם משתמש</div>
                    <input className='registerInput' id='username' type='text' value={username} onInvalid={enterUsernameErr} onChange={(e) => setUsername(e.target.value)} required maxLength={16} />
                    <div className='registerLable'>סיסמה</div>
                    <input className='registerInput' id='newPass' type='password' value={password} onInvalid={regPassErr} onChange={(e) => setPassword(e.target.value)} required maxLength={16} pattern='^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*+-]{8,16}$' />
                    <div className='registerLable'>אימות סיסמה</div>
                    <input className='registerInput' id='repetNewPass' type='password' value={repetPassword} onInvalid={repetPassErr} onChange={(e) => setRepetPassword(e.target.value)} required maxLength={16} pattern={password} />

                    <Button color='primary' variant='contained' className='registerSubmitButton' type='submit'>הרשמה</Button>

                    <div className='regErrDiv'>{regErrDiv}</div>
                </form>
                <div className='monkeyEnterPic'>
                    <img src={monkeyEnter} alt='monkey' />
                </div>
            </div>);
}

export default Register;