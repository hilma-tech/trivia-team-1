import React, {  FormEvent, MouseEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, useMediaQuery } from '@mui/material';

import leavesEnterance from '../images/leaves-enterance.svg';
import monkeyEnter from '../images/monkeyEnter.svg';

import '../style/login.scss'

function Login() {
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [regErrDiv, setRegErrDiv] = useState('')
    const isLargeScreen = useMediaQuery("(min-width: 600px)")
    const navigate = useNavigate()

    function enterUsernameErr() {
        setRegErrDiv("שכחת להכניס משתמש!")
    }

    function regPassErr() {
        setRegErrDiv("שכחת להזין סיסמא!")
    }

    useEffect(()=>{
        setTimeout(()=>{setRegErrDiv("")},4000)
    },[regErrDiv])

    async function handleLoginSubmit(e:FormEvent ){
         // זמני
         e.preventDefault()
         const boolean = await fetch('http://localhost:8080/api/user/login',
             {
                 method: 'POST',
                 headers: { 'Content-Type': 'application/json' },
                 body: JSON.stringify({ username: username, password: password })
             })
             
         if ( await boolean.json()) {
             setRegErrDiv('')
             navigate('/enterance-page')
         }
         else setRegErrDiv("אחד מהפרטים שהזנת שגויים!")
    }

    return (
isLargeScreen ?
            <div id='login' className='comp-children-container'>
                <Typography className='main-login-header'  variant='h1'>חידונים מטורפים</Typography>
                <Typography variant='h2' className='descrip-enter'>בחנו את החברים שלכם בטריוויה שאתם יצרתם!</Typography>
                <div className='entrance-container-div'>
                    <form className='login-form' onSubmit={(e)=>handleLoginSubmit(e)}>
                        <Typography className='login-parag' variant='body1'>שם משתמש</Typography>
                        <input className='login-input' id='username' type='text' value={username} onInvalid={enterUsernameErr} onChange={(e)=>setUsername(e.target.value)} required maxLength={16}/>
                        <Typography className='login-parag' variant='body1'>סיסמה</Typography>
                        <input className='login-input' id='new-pass' type='password'  value={password} onInvalid={regPassErr}  onChange={(e)=>setPassword(e.target.value)} required maxLength={16}/>
                       
                        <Button color='primary' variant='contained' className='login-submit-button' type='submit'>התחבר</Button>
                       
                        <div className='to-register-link'>
                            <a href='Register'>עוד לא משתמש רשום? <u>הרשם כאן</u></a>
                        </div>
                        <div className='reg-err-div'>{regErrDiv}</div>
                    </form>
                    <div className='monkey-enter-pic'>
                        <img src={monkeyEnter} alt='monkey'/>
                    </div>
                </div>
            </div> :
            <div className='login-mobile'>
                <div className='leaves-enterance'>
                    <img src={leavesEnterance} alt='leaves'/>
                </div>
                <header>
                    <div className='small-header'>משחק</div>
                    <div className='big-header'>טריוויה</div>
                </header>
                <form className='login-form'>
                    <div className='login-label'>שם משתמש</div>
                    <input className='login-input' id='username' type='text' value={username} onInvalid={enterUsernameErr} onChange={(e)=>setUsername(e.target.value)} required maxLength={16}/>
                    <div className='login-label'>סיסמה</div>
                    <input className='login-input' id='new-pass' type='password' value={password} onInvalid={regPassErr}  onChange={(e)=>setPassword(e.target.value)} required maxLength={16}/>
                   
                    <Button color='primary' variant='contained' className='login-submit-button' type='submit'>התחבר</Button>
                    <a href='Register'>עוד לא משתמש רשום? <u>הרשם כאן</u></a>
                <div className='reg-err-div'>{regErrDiv}</div>
                </form>
                
                <div className='monkey-enter-pic'>
                    <img src={monkeyEnter} alt='monkey'/>
                </div>
            </div>);
}

export default Login;