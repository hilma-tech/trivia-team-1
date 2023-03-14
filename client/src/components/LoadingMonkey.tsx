import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import loadingMonkey from "../images/loadingMonkey.svg"

import "../style/loadingMonkey.scss"

const AMOUNT_UNTIL_ERROR = 5 * 1000;

export default function LoadingMonkey() {
  const navigate = useNavigate()

  useEffect(() => {
    if (window.innerWidth > 600) {
      const timeout = setTimeout(() => navigate("/error404"), AMOUNT_UNTIL_ERROR);

      return () => clearTimeout(timeout);
    }
  }, [])


  return (<div className='comp-children-container loading-monkey'>
    <img src={loadingMonkey} alt="" />
    <Box className="progress-line" >
      <LinearProgress />
    </Box>
  </div>
  );
}