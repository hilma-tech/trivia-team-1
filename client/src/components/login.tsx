import '../style/login.scss'
import leavesEnterance from '../images/leaves-enterance.svg';
import monkeyEnter from '../images/monkeyEnter.svg';
import { useState } from 'react';
import { Button, Typography } from '@mui/material';
import ChildrenDiv from './childrenContainerDiv';


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
           
                <ChildrenDiv className='login'>
                <Typography variant='h1'>חידונים מטורפים</Typography>
                <Typography variant='h2' className='descripEnter'>בחנו את החברים שלכם בטריוויה שאתם יצרתם!</Typography>
                <div className='entranceContainerDiv'>
                    <form className='loginForm'>
                        <Typography variant='body1'>שם משתמש</Typography>
                        <input id='username' type='text' value={username} onInvalid={enterUsernameErr} onChange={(e)=>setUsername(e.target.value)} required maxLength={16}/>
                        <Typography variant='body1'>סיסמה</Typography>
                        <input id='newPass' type='password'  value={password} onInvalid={regPassErr}  onChange={(e)=>setPassword(e.target.value)} required maxLength={16}/>
                        <br />
                        <Button color='primary' variant='contained' className='loginSubmitButton' type='submit'>הרשמה</Button>
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
                </ChildrenDiv>
             :
            <div className='loginMobile'>
                <div className='leavesEnterance'>
                    <img src={leavesEnterance} />
                </div>
                <Typography variant='h2'>משחק</Typography>
                <Typography variant='h1'>טריוויה</Typography>
                <form className='loginForm'>
                    <div>שם משתמש</div>
                    <input id='username' type='text' value={username} onInvalid={enterUsernameErr} onChange={(e)=>setUsername(e.target.value)} required maxLength={16}/>
                    <div>סיסמה</div>
                    <input id='newPass' type='password' value={password} onInvalid={regPassErr}  onChange={(e)=>setPassword(e.target.value)} required maxLength={16}/>
                    <br />
                    <Button color='primary' variant='contained' className='loginSubmitButton' type='submit'>הרשמה</Button>
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