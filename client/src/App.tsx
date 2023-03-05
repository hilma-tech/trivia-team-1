
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { CssBaseline, ThemeProvider } from '@mui/material';

import LoadingMonkey from './components/LoadingMonkey';
import { SummaryGameDesktop } from "./components/popups/SummaryGameDesktop";
import MyQuizes from './components/myQuizzes/MyQuizes';
import theme from './style/generateTheme'
import Background from './components/Background';
import Navbar from './components/navbar/Navbar';
import EnterancePage from "./components/entrancePage";
import Login from "./components/login";
import Register from "./components/register";
import Error from './components/error404';
import ScoreCard from "./components/score-card/ScoreCard";
import QuestionsProvider from './context/AnswersContext';
import EditQuiz from './components/EditQuiz';
import { PopContextProvider } from "./components/popups/popContext";
import OpeningForTheQuiz from "./components/question-temp/OpeningForTheQuiz";
import QuestionTemp from "./components/question-temp/QuestionTemp";
import './style/background.scss'
import './style/navbar.scss'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <PopContextProvider>
        <QuestionsProvider>
          <Navbar />
          <CssBaseline />
          <Background>
            <Routes>
              <Route path="/enterance-page" element={<EnterancePage />} />
              <Route index element={<Navigate replace to="/login" />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path='*' element={<Navigate replace to="/loading-page" />} />
              <Route path='/edit-quiz' element={<EditQuiz />} />
              <Route path='/error404' element={<Error />} />
              <Route path='/loading-page' element={<LoadingMonkey />} /> 
              <Route path='/quiz/:userName/:quizName' element={<Outlet />} >
                <Route index element={<OpeningForTheQuiz />} />
                <Route path='questions' element={<QuestionTemp />} />
                <Route path='scores' element={<ScoreCard />} />
                <Route path='finished-game-pc' element ={<SummaryGameDesktop />} />
              </Route>
              <Route path='/my-quizzes' element={<Outlet />}>
                <Route index element={<MyQuizes />} />
                <Route path=':id/scores' element={<ScoreCard />} />
              </Route>
            </Routes >
          </Background>
        </QuestionsProvider>
      </PopContextProvider>
    </ThemeProvider>
  );
}

export default App;