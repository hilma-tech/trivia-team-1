
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { CssBaseline, ThemeProvider } from '@mui/material';

import LoadingMonkey from './components/LoadingMonkey';
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

import './style/background.scss'
import './style/navbar.scss'
import { PopContextProvider } from "./components/popups/popContext";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <QuestionsProvider>
        <PopContextProvider>
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
              <Route path='/my-quizzes' element={<Outlet />}>
                <Route index element={<MyQuizes />} />
                <Route path=':id/scores' element={<ScoreCard />} />
              </Route>
            </Routes >
          </Background>
        </PopContextProvider>
      </QuestionsProvider>
    </ThemeProvider>
  );
}

export default App;