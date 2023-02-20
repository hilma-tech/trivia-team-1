import { CssBaseline, ThemeProvider } from '@material-ui/core';
import React from 'react';
import Test from './Components/test.jsx'
import theme from './style/genericTheme'
import Navbar from './Components/Navbar.jsx';
import './style/background.scss'
import './style/navbar.scss'
import Background from './Components/Background';



function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        <Background>
          <Test />
        </Background>
      </ThemeProvider>
    </div>
  );
}

export default App;
