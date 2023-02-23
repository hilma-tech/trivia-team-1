import { CssBaseline, ThemeProvider } from '@mui/material';
import Popup from './components/popups/Popup';
import theme from './style/generateTheme'
import Navbar from './components/navbar/Navbar';
import Background from './components/Background';
import './style/background.scss'
import './style/navbar.scss'
import MyQuizes from './components/myQuizzes/MyQuizes';
import GenericPop from './components/popups/GenericPop';
import { PopContextProvider } from './components/popups/popContext';


function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        <Background>
          <PopContextProvider>
            <MyQuizes />
          </PopContextProvider>

        </Background>
      </ThemeProvider>
    </div>
  )
}

export default App;
