import { CssBaseline, ThemeProvider } from '@material-ui/core';
import theme from './style/generateTheme'
import Navbar from './Components/navbar/Navbar';
import Background from './Components/Background';
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
        </Background>
      </ThemeProvider>
    </div>
  )
}

export default App;
