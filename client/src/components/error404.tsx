import { useEffect } from 'react';
import { Typography } from '@mui/material';

import Monkey404 from '../images/404monkey.svg'

import '../style/error404.scss'


function Error() {

    function goBackHistoryFunc(){
        window.history.go(-1)
    }
    

    useEffect(()=>{
        window.addEventListener("popstate", ()=>goBackHistoryFunc());
        return () => {
            window.removeEventListener("popstate", ()=>goBackHistoryFunc());
        };
    },[])

    return ( 
    <div className="error-container">
        <div className="error-div">
            <span className='error-span'>4</span>
            <img className='error-monkey' src={Monkey404} alt='monkey'/>
            <span className='error-span'>4</span>
            <Typography className='error-descrip' variant='h2'>עמוד זה אינו קיים</Typography >
        </div>
    
    </div> 
    );
}

export default Error;