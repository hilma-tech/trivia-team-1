import { Button, Typography } from "@mui/material"
import React, { createContext, ReactNode, FC, useState, useContext } from "react"
import '../../style/popups.scss'
import desktopMonkey from '../../images/popUps/desktopMonkey.svg'
import ShareIcon from '@mui/icons-material/Share';


export const SummaryGameDesktop: FC = () => {
  return (
    <>
      <div className="comp-children-container computer-finish-game confetti-pc">
        <img alt="finished game monkey" src={desktopMonkey} />
        <Typography component="div" className="coputer-finish-game-inner-text" variant='h3' sx={{ fontWeight: 'bolder', paddingTop: '6vh' }}>ענית נכון על 2 שאלות. ציונך: 50</Typography>
        <Typography component="div" className="coputer-finish-game-inner-text" variant='h6' >שתף את התוצאה שלך עם חברים ואתגר גם אותם במבחן!</Typography>
        <Button sx={{ width: '14vw', height: '5vh', fontSize: '1.5rem', fontWeight: 'bolder' }} variant="contained" color="primary"><ShareIcon sx={{ fontSize: '2rem', marginLeft: '1vw' }} />שתף תוצאה</Button>
      </div>

    </>
  )
}

