
import { Navigate, Route, Routes } from "react-router-dom";
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
import EditQuiz from "./components/edit-quiz/EditQuiz";
import AnswersProvider from "./components/edit-quiz/context/AnswersContext";

import './style/background.scss'
import './style/navbar.scss'
import './App.scss'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <CssBaseline />
      <AnswersProvider>
        <Background>
          <Routes>
            <Route path="/edit-quiz" element={<EditQuiz />} />
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
        </Background>
      </AnswersProvider>
    </ThemeProvider>
  );
}

export default App;