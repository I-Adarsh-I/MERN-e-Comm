import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import { loginSuccessful, logout } from "./redux/slices/userSlice";
import Home from "./pages/Home/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Products from "./pages/product/Products";
import Cart from "./pages/cart/Cart";
import Checkout from "./pages/chekout/Checkout";
import Profile from "./pages/profile/Profile";
import AllOrders from "./pages/admin_accessible_pages/AllOrders";
import AllProducts from "./pages/admin_accessible_pages/AllProducts";
import AllProfiles from "./pages/admin_accessible_pages/AllProfiles";
import Success from "./pages/chekout/Success";
import Failure from "./pages/chekout/Failure";
import UserProfile from "./pages/profile/UserProfile";
import AdminRoutes from "./AdminRoutes";
import PageNotFound from "./pages/pageNotFound/PageNotFound";

function DynamicRoute() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    if (userInfo) {
      dispatch(loginSuccessful(userInfo));
      if (window.location.pathname === "/") {
       return navigate("/home");
      }
    } else {
      localStorage.removeItem("persist:root");
      localStorage.removeItem("Auth token");
      dispatch(logout());
      if(!window.location.pathname === '/register'){
        navigate("/");
      }
    }
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/allproducts" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/paymentsuccess" element={<Success />} />
        <Route path="/paymentfailure" element={<Failure />} />
        <Route path="/userprofile" element={<UserProfile />} />
        <Route
          path="/allorders"
          element={
            <AdminRoutes>
              <AllOrders />
            </AdminRoutes>
          }
        />
        <Route
          path="/productslist"
          element={
            <AdminRoutes>
              <AllProducts />
            </AdminRoutes>
          }
        />
        <Route
          path="/allprofiles"
          element={
            <AdminRoutes>
              <AllProfiles />
            </AdminRoutes>
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default DynamicRoute;
