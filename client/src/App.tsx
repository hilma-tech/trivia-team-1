import { Route, Routes } from "react-router-dom";
import EnterancePage from "./components/entrancePage";
function App() {
  return (
    <Routes>
      <Route path="/enterance-page" element={<EnterancePage/>}/>
    </Routes>
  );
}

export default App;
