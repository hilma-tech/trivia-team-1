import React, { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, useMediaQuery } from '@mui/material';
import axios from 'axios';

import leavesEnterance from '../images/leaves-enterance.svg';
import monkeyEnter from '../images/monkeyEnter.svg';

import '../style/register.scss'


function Register() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [repetPassword, setRepetPassword] = useState('')
    const [regErrDiv, setRegErrDiv] = useState('')
    const navigate = useNavigate()
    const isLargeScreen = useMediaQuery("(min-width: 600px)")

    useEffect(() => {
        const timeout = setTimeout(() => setRegErrDiv(""), 4000)
        return () => clearTimeout(timeout);
    }, [regErrDiv])

    async function handleRegisterSubmit(e: FormEvent) {
        try {
            e.preventDefault()
            const { data } = await axios.post('/api/user/register',
                { username: username, password: password }
            )
            if (data) {
                setRegErrDiv('')
                alert("You signed up successfully!")
                navigate('/')
            }
            else setRegErrDiv("משהו השתבש בתהליך ההרשמה!")
        } catch (error) {
            console.log(error, "Error");
        }
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
        isLargeScreen ?
            <div id='register' className='comp-children-container'>
                <Typography className='main-register-header' variant='h1'>חידונים מטורפים</Typography>
                <Typography variant='h2' className='descrip-enter'>בחנו את החברים שלכם בטריוויה שאתם יצרתם!</Typography>
                <div className='entrance-container-div'>
                    <form className='register-form' onSubmit={handleRegisterSubmit}>
                        <Typography className='login-parag' variant='body1'>שם משתמש</Typography>
                        <input className='register-input' type='text' value={username} onInvalid={enterUsernameErr} onChange={(e) => setUsername(e.target.value)} required maxLength={16} />
                        <Typography className='login-parag' variant='body1'>סיסמה</Typography>
                        <input className='register-input' type='password' value={password} onInvalid={regPassErr} onChange={(e) => setPassword(e.target.value)} required maxLength={16} pattern='^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*+-]{8,16}$' />
                        <Typography className='login-parag' variant='body1'>אימות סיסמה</Typography>
                        <input className='register-input' type='password' value={repetPassword} onInvalid={repetPassErr} onChange={(e) => setRepetPassword(e.target.value)} required maxLength={16} pattern={password} />

                        <Button color='primary' variant='contained' className='register-submit-button' type='submit'>הרשמה</Button>

                        <div className='reg-err-div'>{regErrDiv}</div>
                    </form>
                    <div className='monkey-enter-pic'>
                        <img src={monkeyEnter} alt='monkey' />
                    </div>
                </div>
            </div> :
            <div className='register-mobile'>
                <div className='leaves-enterance'>
                    <img src={leavesEnterance} alt="leaves" />
                </div>
                <header>
                    <div className='small-header'>משחק</div>
                    <div className='big-header'>טריוויה</div>
                </header>

                <form className='register-form' onSubmit={(e: React.SyntheticEvent) => handleRegisterSubmit(e)}>
                    <div className='register-lable'>שם משתמש</div>
                    <input className='register-input' type='text' value={username} onInvalid={enterUsernameErr} onChange={(e) => setUsername(e.target.value)} required maxLength={16} />
                    <div className='register-lable'>סיסמה</div>
                    <input className='register-input' type='password' value={password} onInvalid={regPassErr} onChange={(e) => setPassword(e.target.value)} required maxLength={16} pattern='^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*+-]{8,16}$' />
                    <div className='register-lable'>אימות סיסמה</div>
                    <input className='register-input' type='password' value={repetPassword} onInvalid={repetPassErr} onChange={(e) => setRepetPassword(e.target.value)} required maxLength={16} pattern={password} />

                    <Button color='primary' variant='contained' className='register-submit-button' type='submit'>הרשמה</Button>

                    <div className='reg-err-div'>{regErrDiv}</div>
                </form>
                <div className='monkey-enter-pic'>
                    <img src={monkeyEnter} alt='monkey' />
                </div>
            </div>);
}

export default Register;