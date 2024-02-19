import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  redirect,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import Navbar from "./components/navbar/Navbar";
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

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/allproducts" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/allorders" element={<AllOrders />} />
        <Route path="/productslist" element={<AllProducts />} />
        <Route path="/allprofiles" element={<AllProfiles />} />
        <Route path="/paymentsuccess" element={<Success />} />
        <Route path="/paymentfailure" element={<Failure />} />
      </Routes>
    </div>
  );
}

export default App;
