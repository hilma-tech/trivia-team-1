import { CssBaseline, ThemeProvider } from '@material-ui/core';
import Popup from './Components/popups/popup';
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
        <Navbar name="איטליה מה אתם יודעים?" type="playQuizz" />
        <Background>
          {/* components here */}
        </Background>
          <Popup type='deleteQuiz'/>
      </ThemeProvider>
    </div>
  )
}

export default App;
