import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const navigate = useNavigate();

  const logOutHandler = () => {
    try {
      localStorage.removeItem('Auth token');
      localStorage.removeItem('persist:root');

      navigate('/')
    } catch (err) {
      console.log(err);
    }
  }

  const isTokenExist = localStorage.getItem('Auth token')

  const itemsInCart = useSelector(state => state.cart)

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light py-3 sticky-top">
      <div className="container">
        <Link className="navbar-brand fw-bold fs-4 px-2" to="/">
          Cloth Mantra
        </Link>
        <button
          className="navbar-toggler mx-2"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav m-auto my-2 text-center gap-5">
            <li className="nav-item fw-bold">
              <Link className="nav-link" to="/home">
                Home{" "}
              </Link>
            </li>
            <li className="nav-item fw-bold">
              <Link className="nav-link" to="/allproducts">
                Products
              </Link>
            </li>
          </ul>
          <div className="buttons text-center">
            {isTokenExist ? (
              <button className="btn btn-outline-dark m-2" onClick={logOutHandler}>
                <i className="fa-solid fa-right-from-bracket mr-1"></i> Log Out
              </button>
            ) : (
              <Link to="/" className="btn btn-outline-dark m-2">
                <i className="fa fa-sign-in-alt mr-1"></i> Login
              </Link>
            )}

            {isTokenExist && (
            <Link to="/cart" className="btn btn-outline-dark m-2">
              <i className="fa fa-cart-shopping mr-1"></i> Cart ({itemsInCart.items.length})
            </Link>
            )}

            <Link to="/profile" className="btn btn-outline-dark m-2">
              <i className="fa-solid fa-user mr-1"></i> Profile{" "}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
