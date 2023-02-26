import React from 'react';
import QuastionTemp from './components/quastion-temp';
import OpeningForTheQuiz from './components/opening-for-the-quiz';
import './App.css';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './style/generateTheme'
import Navbar from './components/navbar/Navbar';
import Background from './components/Background';
import './style/background.scss'
import './style/navbar.scss'


function App() {
  return (
    <div>
      {/* <OpeningForTheQuiz/> */}
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        <Background>
        {/* <QuastionTemp /> */}
        <OpeningForTheQuiz/>
          {/* components here */}
        </Background>
      </ThemeProvider>
    </div>
  )
}

export default App;
