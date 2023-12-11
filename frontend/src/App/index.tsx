import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Kitchen from "./Kitchen";
import { CssBaseline } from "@mui/material";
import axios from "axios";

axios.defaults.withCredentials = true;

function App() {
  return (
    <>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Kitchen />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
