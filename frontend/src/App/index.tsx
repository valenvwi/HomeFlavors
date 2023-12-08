import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Kitchen from "./Kitchen";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Kitchen />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default App;
