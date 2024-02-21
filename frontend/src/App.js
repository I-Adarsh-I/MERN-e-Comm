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
import AdminRoutes from "./AdminRoutes";

function App() {
  return (
    <div className="App">
      <Navbar />
      <DynamicRoute />
      <ToastContainer autoClose={5000} />
    </div>
  );
}

export default App;
