import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";

import LoadingMonkey from "./components/LoadingMonkey";
import { SummaryGameDesktop } from "./components/popups/SummaryGameDesktop";
import MyQuizzes from "./components/myQuizzes/MyQuizes";
import theme from "./style/generateTheme";
import Background from "./components/Background";
import Navbar from "./components/navbar/Navbar";
import EntrancePage from "./components/entrancePage";
import Login from "./components/login";
import Register from "./components/register";
import Error from "./components/error404";
import ScoreCard from "./components/score-card/ScoreCard";
import QuestionsProvider from "./context/AnswersContext";
import EditQuiz from "./components/edit-quiz/EditQuiz";
import { PopContextProvider } from "./components/popups/popContext";
import OpeningForTheQuiz from "./components/play-quiz/OpeningForTheQuiz";
import QuestionTemp from "./components/play-quiz/PlayQuiz";
import UserProvider from "./context/UserContext";


import "./style/background.scss";
import "./style/navbar.scss";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <PopContextProvider>
        <QuestionsProvider>
          <UserProvider>
            <Navbar />
            <CssBaseline />
            <Background>
              <Routes>
                <Route path="/entrance-page" element={<EntrancePage />} />
                <Route index element={<Navigate replace to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<Navigate replace to="/loading-page" />} />
                <Route path="/edit-quiz" element={<EditQuiz />} />
                <Route path="/error404" element={<Error />} />
                <Route path="/loading-page" element={<LoadingMonkey />} />
                <Route path="/quiz/:userId/:quizId" element={<Outlet />}>
                  <Route index element={<OpeningForTheQuiz />} />
                  <Route path="scores" element={<ScoreCard />} />
                  <Route path="finished-game-pc" element={<SummaryGameDesktop />} />
                  <Route path="questions" element={<QuestionTemp />} />
                </Route>
                <Route path="/my-quizzes" element={<Outlet />}>
                  <Route index element={<MyQuizzes />} />
                  <Route path=":id/scores" element={<ScoreCard />} />
                </Route>
              </Routes>
            </Background>
          </UserProvider>
        </QuestionsProvider>
      </PopContextProvider>
    </ThemeProvider>
  );
}

export default App;