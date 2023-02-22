import '../style/error404.scss'
import Monkey404 from '../images/404monkey.svg'
import { Typography } from '@mui/material';

function Error() {

    return ( 
    <div className="error404Container">
        <div className="error404Div">
            <span className='span4'>4</span>
            <img src={Monkey404}/>
            <span className='span4'>4</span>
            <Typography variant='h2'>עמוד זה אינו קיים</Typography >
        </div>
    
    </div> 
    );
}

export default Error;