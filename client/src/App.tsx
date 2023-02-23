import { Navigate, Route, Routes } from "react-router-dom";
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './style/generateTheme'
import './style/background.scss'
import './style/navbar.scss'
import LoadingMonkey from './components/LoadingMonkey';
import MyQuizes from './components/myQuizzes/MyQuizes';

import Background from './components/Background';
import Navbar from './components/navbar/Navbar';
import EnterancePage from "./components/entrancePage";
import Login from "./components/login";
import Register from "./components/register";
import ScoreCard from "./components/score-card/ScoreCard";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <CssBaseline />
      <Background>
        <Routes>
          <Route path="/Enterance-Page" element={<EnterancePage />} />
          <Route index element={<Navigate replace to="/Login" />} />
          <Route path="/Login" element={<Register />} />
          <Route path="/Register" element={<Register />} />
        </Routes >
      </Background>
    </ThemeProvider>
  );
}

export default App;