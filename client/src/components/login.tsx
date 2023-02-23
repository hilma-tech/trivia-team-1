import '../style/login.scss'
import { Button, Typography } from '@mui/material';
import { useState } from 'react';

import leavesEnterance from '../images/leaves-enterance.svg';
import monkeyEnter from '../images/monkeyEnter.svg';

function Login() {
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [regErrDiv, setRegErrDiv] = useState('')


    function enterUsernameErr() {
        setRegErrDiv("שכחת להכניס משתמש!")
    }

    function regPassErr() {
        setRegErrDiv("שכחת להזין סיסמא!")
    }


    return (
        window.screen.width > 600 ?
            <div className='compChildrenContainer login'>
                <Typography className='mainLoginHeader'  variant='h1'>חידונים מטורפים</Typography>
                <Typography variant='h2' className='descripEnter'>בחנו את החברים שלכם בטריוויה שאתם יצרתם!</Typography>
                <div className='entranceContainerDiv'>
                    <form className='loginForm'>
                        <Typography className='loginParag' variant='body1'>שם משתמש</Typography>
                        <input className='loginInput' id='username' type='text' value={username} onInvalid={enterUsernameErr} onChange={(e)=>setUsername(e.target.value)} required maxLength={16}/>
                        <Typography className='loginParag' variant='body1'>סיסמה</Typography>
                        <input className='loginInput' id='newPass' type='password'  value={password} onInvalid={regPassErr}  onChange={(e)=>setPassword(e.target.value)} required maxLength={16}/>
                       
                        <Button color='primary' variant='contained' className='loginSubmitButton' type='submit'>הרשמה</Button>
                       
                        <div className='toRegisterLink'>
                            <a href='Register'>עוד לא משתמש רשום? <u>הרשם כאן</u></a>
                        </div>
                        <div className='regErrDiv'>{regErrDiv}</div>
                    </form>
                    <div className='monkeyEnterPic'>
                        <img src={monkeyEnter} alt='monkey'/>
                    </div>
                </div>
            </div> :
            <div className='loginMobile'>
                <div className='leavesEnterance'>
                    <img src={leavesEnterance} alt='leaves'/>
                </div>
                <header>
                    <div className='smallHeader'>משחק</div>
                    <div className='bigHeader'>טריוויה</div>
                </header>
                <form className='loginForm'>
                    <div className='loginLabel'>שם משתמש</div>
                    <input className='loginInput' id='username' type='text' value={username} onInvalid={enterUsernameErr} onChange={(e)=>setUsername(e.target.value)} required maxLength={16}/>
                    <div className='loginLabel'>סיסמה</div>
                    <input className='loginInput' id='newPass' type='password' value={password} onInvalid={regPassErr}  onChange={(e)=>setPassword(e.target.value)} required maxLength={16}/>
                   
                    <Button color='primary' variant='contained' className='loginSubmitButton' type='submit'>הרשמה</Button>
                    <br/>
                    <a href='Register'>עוד לא משתמש רשום? <u>הרשם כאן</u></a>
                <div className='loginLabel regErrDiv'>{regErrDiv}</div>
                </form>
                
                <div className='monkeyEnterPic'>
                    <img src={monkeyEnter} alt='monkey'/>
                </div>
            </div>);
}

export default Login;