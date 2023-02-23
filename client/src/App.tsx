import { CssBaseline, ThemeProvider } from '@mui/material';
import Popup from './components/popups/Popup';
import theme from './style/generateTheme'
import Navbar from './components/navbar/Navbar';
import Background from './components/Background';
import './style/background.scss'
import './style/navbar.scss'
import GenericPop from './components/popups/GenericPop';


function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        <Background>
          <GenericPop />
          {/* <Popup type='copyQuiz'/> */}
          {/* components here */}
        </Background>
      </ThemeProvider>
    </div>
  )
}

export default App;
