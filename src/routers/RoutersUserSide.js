import { Route, Routes, Navigate, useNavigate, Outlet } from "react-router-dom";

import Home from "../userSide/pages/Home";
import Shop from "../userSide/pages/Shop";
import Cart from "../userSide/pages/Cart";
import ProductDetails from "../userSide/pages/ProductDetails";
import Checkout from "../userSide/pages/Checkout";
import Login from "../userSide/pages/Login";
import Signup from "../userSide/pages/Signup";
import Order from "../userSide/pages/Order";
import { OrderDetail } from "../userSide/components/UI/OrderDetail";
import Profile from "../userSide/pages/Profile/Profile";
import ForgotPassword from "../userSide/pages/ForgotPassword";
import ResetPassword from "../userSide/pages/ResetPassword";
import Payment from "../userSide/pages/Payment";
import ErrorPage from "../userSide/ErrorPage/ErrorPage";

const PrivateRoute = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUserInfor"));
  return currentUser ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: window.location.pathname }} />
  );
};

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="home" element={<Home />} />
      <Route path="shop" element={<Shop />} />
      <Route path="shop/:id" element={<ProductDetails />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="reset-password" element={<ResetPassword />} />
      <Route exact path="/" element={<PrivateRoute />}>
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="payment" element={<Payment />} />
        <Route path="order" element={<Order />} />
        <Route path="order/:id" element={<OrderDetail />} />
        <Route path="profile" element={<Profile />} />
      </Route>
      <Route path="error" element={<ErrorPage />} />

      {/* <PrivateRoute path="cart" element={<Cart />} />
      <Route path="checkout" element={<Checkout />} />
      <Route path="payment" element={<Payment />} />
      <Route path="order" element={<Order />} />
      <Route path="order/:id" element={<OrderDetail />} /> */}
      <Route path="*" element={<Home />} />
    </Routes>
  );
};

export default Routers;
