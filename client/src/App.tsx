import { Navigate, Route, Routes } from "react-router-dom";
import EnterancePage from "./components/entrancePage";
import Login from "./components/login";
import Register from "./components/register";
function App() {
  return (
    <Routes>
      <Route path="/Enterance-Page" element={<EnterancePage/>}/>
      <Route index element={<Navigate replace to="/Login" />} />
      <Route path="/Login" element={<Login/>}/>
      <Route path="/Register" element={<Register/>}/>
    </Routes>
  );
}

export default App;
