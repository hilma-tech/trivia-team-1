import Box from '@mui/material/Box';
import loadingMonkey from "../images/loadingMonkey.svg"
import LinearProgress from '@mui/material/LinearProgress';
import "../style/loadingMonkey.scss"
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';



export default function LoadingMonkey() {
  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(() => navigate('/error404'), 3000)
  }, [])


  return (<div className='loading-monkey'>
    <img src={loadingMonkey} alt="" />
    <Box className="progressLine" >
      <LinearProgress />
    </Box>
  </div>
  );
}