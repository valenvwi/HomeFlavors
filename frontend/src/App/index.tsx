import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Kitchen from "./Kitchen";
import { CssBaseline } from "@mui/material";
import axios from "axios";
import AppNavBar from "./UI/AppNavBar";
import Cart from "./Cart";
import "./App.css";
import OrderHistory from "./OrderHistory";
import Checkout from "./Checkout";

axios.defaults.withCredentials = true;

function App() {
  return (
    <>
      <CssBaseline />
      <AppNavBar />
      <Routes>
        <Route path="/" element={<Kitchen />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orderHistory" element={<OrderHistory />} />
      </Routes>
    </>
  );
}

export default App;
