import Box from '@mui/material/Box';
import loadingMonkey from "../images/loadingMonkey.svg"
import LinearProgress from '@mui/material/LinearProgress';
import  "../style/loadingMonkey.scss"



export default function LoadingMonkey() {
  return (<div className='loading-monkey'>
    <img src={loadingMonkey} alt="" />
    <Box className="progress-line" >
      <LinearProgress />
    </Box>
    </div>
  );
}