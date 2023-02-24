import { Navigate, Route, Routes } from "react-router-dom";
import { CssBaseline, ThemeProvider } from '@mui/material';
import Popup from './components/popups/Popup';
import './style/background.scss'
import './style/navbar.scss'

import LoadingMonkey from './components/LoadingMonkey';
import MyQuizes from './components/myQuizzes/MyQuizes';
import theme from './style/generateTheme'
import Background from './components/Background';
import Navbar from './components/navbar/Navbar';
import EnterancePage from "./components/entrancePage";
import Login from "./components/login";
import Register from "./components/register";
import Error from './components/error404';
import ScoreCard from "./components/score-card/ScoreCard"; import GenericPop from './components/popups/GenericPop';
import { PopContextProvider } from './components/popups/popContext';
import { SummaryGameDesktop } from './components/popups/SummaryGameDesktop';


function App() {
  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <CssBaseline />
      <Background>
        <PopContextProvider>
          <Routes>
            <Route path="/enterance-page" element={<EnterancePage />} />
            <Route index element={<Navigate replace to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path='*' element={<Navigate replace to="/loading-page" />} />
            <Route path='/error404' element={<Error />} />
            <Route path='/loading-page' element={<LoadingMonkey />} />
            <Route path='/my-quizzes'>
              <Route path='/my-quizzes' element={<MyQuizes />} />
              <Route path='/my-quizzes/:id/scoreboard' element={<ScoreCard />} />
            </Route>
          </Routes >
        </PopContextProvider>
      </Background>
    </ThemeProvider>
  );
}

export default App;