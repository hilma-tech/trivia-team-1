import theme from './style/generateTheme'
import Background from './components/Background';
import './style/background.scss'
import './style/navbar.scss'
import Navbar from './components/navbar/Navbar';
import { Navigate, Route, Routes } from "react-router-dom";
import EnterancePage from "./components/entrancePage";
import Login from "./components/login";
import Register from "./components/register";
import { CssBaseline, ThemeProvider } from '@mui/material';
import Error from './components/error404';
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <CssBaseline />
      <Background>
        <Routes>
          <Route path="/Enterance-Page" element={<EnterancePage />} />
          <Route index element={<Navigate replace to="/Login" />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path='*' element={<Navigate replace to="/Error404" />} />
          <Route path='/Error404' element={<Error/>}/>
        </Routes >
      </Background>
    </ThemeProvider>
  );
}

export default App;
