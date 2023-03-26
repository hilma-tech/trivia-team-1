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
import DemoQuiz from "./components/edit-quiz/DemoQuiz";
import OpeningForTheQuiz from "./components/play-quiz/OpeningForTheQuiz";
import QuestionTemp from "./components/play-quiz/PlayQuiz";
import UserProvider from "./context/UserContext";
import { PlayerNameProvider } from "./context/PlayerNameContext";
import { PopContextProvider } from "./components/popups/popContext";


import "./style/background.scss";
import "./style/navbar.scss";
import About from "./components/about";
import { PrivateRoute } from "@hilma/auth";
import NavigateUser from "./components/NavigateUser";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <QuestionsProvider>
        <UserProvider>
          <PlayerNameProvider>
            <PopContextProvider>
              <Navbar />
              <CssBaseline />
              <Background>
                <Routes>
                  <Route index element={<NavigateUser />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/error404" element={<Error />} />
                  <Route path="*" element={<Navigate replace to="/loading-page" />} />
                  <Route path="/loading-page" element={<LoadingMonkey />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/quiz/:quizId" element={<Outlet />}>
                    <Route index element={<OpeningForTheQuiz />} />
                    <Route path="scores" element={<ScoreCard />} />
                    <Route path="finished-game-pc" element={<SummaryGameDesktop />} />
                    <Route path="questions" element={<QuestionTemp />} />
                  </Route>

                  <Route path="/enterance-page" element={
                    <PrivateRoute componentName="User" component={<EntrancePage />} />
                  } />
                  <Route path="/add-quiz" element={
                    <PrivateRoute componentName="User" component={<EditQuiz />} />
                  } />
                   <Route path="/edit-quiz/:quizId" element={
                    <PrivateRoute componentName="User" component={<EditQuiz />} />
                  } />
                  <Route path="/my-quizzes" element={<Outlet />}>
                    <Route index element={
                      <PrivateRoute componentName="User" component={<MyQuizzes />} />
                    } />
                  </Route>
                </Routes>
              </Background>
            </PopContextProvider>
          </PlayerNameProvider>
        </UserProvider>
      </QuestionsProvider>
    </ThemeProvider >
  );
}

export default App;
