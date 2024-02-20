import "./App.css";
// import {
//   Routes,
//   Route,
// } from "react-router-dom";
// import Home from "./pages/Home/Home";
import Navbar from "./components/navbar/Navbar";
// import Login from "./pages/auth/Login";
// import Register from "./pages/auth/Register";
// import Products from "./pages/product/Products";
// import Cart from "./pages/cart/Cart";
// import Checkout from "./pages/chekout/Checkout";
// import Profile from "./pages/profile/Profile";
// import AllOrders from "./pages/admin_accessible_pages/AllOrders";
// import AllProducts from "./pages/admin_accessible_pages/AllProducts";
// import AllProfiles from "./pages/admin_accessible_pages/AllProfiles";
// import Success from "./pages/chekout/Success";
// import Failure from "./pages/chekout/Failure";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import UserProfile from "./pages/profile/UserProfile";
import DynamicRoute from "./DynamicRoute";

function App() {
  return (
    <div className="App">
      <Navbar />
      <DynamicRoute />
      {/* <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/allproducts" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/allorders" element={<AllOrders />} />
        <Route path="/productslist" element={<AllProducts />} />
        <Route path="/allprofiles" element={<AllProfiles />} />
        <Route path="/paymentsuccess" element={<Success />} />
        <Route path="/paymentfailure" element={<Failure />} />
        <Route path="/userprofile" element = {<UserProfile />} />
      </Routes> */}
      <ToastContainer autoClose={5000} />
    </div>
  );
}

export default App;
