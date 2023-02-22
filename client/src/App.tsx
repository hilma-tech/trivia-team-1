import ScoreCard from './components/score-card/ScoreCard';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './style/generateTheme'
import Navbar from './components/navbar/Navbar';
import Background from './components/Background';
import './style/background.scss'
import './style/navbar.scss'


function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        <Background>
          {/* components here */}
          <ScoreCard />
        </Background>
      </ThemeProvider>
    </div>
  )
}

export default App;