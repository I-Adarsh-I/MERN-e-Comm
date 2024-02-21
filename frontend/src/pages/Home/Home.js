import React from "react";
import HeadCarousel from "../../components/header carousel/HeadCarousel";
import { useSelector } from "react-redux";
import Products from "../product/Products";

function Home() {
  const userInfo = useSelector((state) => state.auth);

  return (
    <div>
      <HeadCarousel />
      <div className="container mt-5 mb-4">
        {userInfo.isLoggedIn && <Products />}
      </div>
    </div>
  );
}

export default Home;
