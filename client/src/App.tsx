import { Navigate, Route, Routes } from "react-router-dom";
import { CssBaseline, ThemeProvider } from '@mui/material';
import './style/background.scss'
import './style/navbar.scss'
import MyQuizes from './components/myQuizzes/MyQuizes';

import theme from './style/generateTheme'
import Background from './components/Background';
import Navbar from './components/navbar/Navbar';
import EnterancePage from "./components/entrancePage";
import Login from "./components/login";
import Register from "./components/register";
import Error from './components/error404';
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <CssBaseline />
      <Background>
        <Routes>
          <Route path="/enterance-page" element={<EnterancePage />} />
          <Route index element={<Navigate replace to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path='*' element={<Navigate replace to="/error404" />} />
          <Route path='/error404' element={<Error/>}/>
        </Routes >
      </Background>
    </ThemeProvider>
  );
}

export default App;
