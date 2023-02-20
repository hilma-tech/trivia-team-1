import { CssBaseline, ThemeProvider } from '@material-ui/core';
import React from 'react';
import Test from './Components/test.jsx'
import theme from './style/genericTheme'
import Navbar from './Components/Navbar.jsx';
import './style/navbar.scss'



function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        <Test />
      </ThemeProvider>
    </div>
  );
}

export default App;
