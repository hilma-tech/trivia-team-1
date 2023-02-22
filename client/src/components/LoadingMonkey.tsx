import Box from '@mui/material/Box';
import loadingMonkey from "../images/loadingMonkey.svg"
import LinearProgress from '@mui/material/LinearProgress';
import  "../style/loadingMonkey.scss"



export default function LoadingMonkey() {
  return (<div className='loadingMonkey'>
    <img src={loadingMonkey} alt="loading monkey" />
    <Box className="progressLine" >
      <LinearProgress />
    </Box>
    </div>
  );
}