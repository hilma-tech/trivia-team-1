import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import loadingMonkey from "../images/loadingMonkey.svg"

import "../style/loadingMonkey.scss"



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