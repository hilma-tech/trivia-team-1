import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './style/generateTheme'
import Navbar from './components/navbar/Navbar';
import Background from './components/Background';
import './style/background.scss'
import './style/navbar.scss'
import LoadingMonkey from './components/LoadingMonkey';


function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        <Background>
         <LoadingMonkey/>
        </Background>
      </ThemeProvider>
    </div>
  )
}

export default App;
