import { Route, Routes, useNavigate } from "react-router-dom";
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
import PendingOrders from "./PendingOrders";
import SalesData from "./SalesData";
import useAuth from "./Utils/useAuth";
import Landing from "./Landing";

axios.defaults.withCredentials = true;

function App() {
  const { isCheckingSession } = useAuth();


  return (
    <>
      <CssBaseline />
      <AppNavBar />
      {isCheckingSession ? (
        <div>Checking user...</div>
      ) : (
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/menu" element={<Kitchen />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orderHistory" element={<OrderHistory />} />
          <Route path="/pendingOrders" element={<PendingOrders />} />
          <Route path="/salesData" element={<SalesData />} />
        </Routes>
      )}
    </>
  );
}

export default App;
