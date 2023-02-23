import Box from '@mui/material/Box';
import loadingMonkey from "../images/loadingMonkey.svg"
import LinearProgress from '@mui/material/LinearProgress';
import "../style/loadingMonkey.scss"
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';



export default function LoadingMonkey() {
  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(() => navigate('/error404'), 10000)
  }, [])


  return (<div className='comp-children-container loading-monkey'>
    <img src={loadingMonkey} alt="" />
    <Box className="progress-line" >
      <LinearProgress />
    </Box>
  </div>
  );
}