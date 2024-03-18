import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/userSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isInHome, setIsInHome] = useState(false);
  const logOutHandler = () => {
    try {
      localStorage.removeItem("Auth token");
      localStorage.removeItem("persist:root");
      dispatch(logout());
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const isTokenExist = localStorage.getItem("Auth token");

  const itemsInCart = useSelector((state) => state.cart);
  const userInfo = useSelector((state) => state.auth);

  useEffect(() => {
    if (window.location.pathname === "/home") {
      setIsInHome(true);
    } else {
      dispatch(logout())
      setIsInHome(false);
    }
  }, [window.location.pathname]);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light py-3 sticky-top">
      <div className="container">
        <Link
          className="navbar-brand fw-bold fs-4 px-2"
          to={isInHome ? "/home" : "/" }
        >
          <img src="/logo.png" alt="Clothing distro" width={'200px'}/>
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
          {userInfo.isLoggedIn && (
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
          )}
          <div className="buttons text-center">
            {isTokenExist ? (
              " "
            ) : (
              <Link to="/" className="btn btn-outline-dark m-2">
                <i className="fa fa-sign-in-alt mr-1"></i> Login
              </Link>
            )}

            {isTokenExist && (
              <Link to="/cart" className="btn btn-outline-dark m-2">
                <i className="fa fa-cart-shopping mr-1"></i> Cart (
                {itemsInCart.items.length})
              </Link>
            )}

            {isTokenExist && (
              <div className="dropdown d-inline">
                <button
                  type="button"
                  className="btn btn-outline-dark dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Profile
                </button>
                <ul className="dropdown-menu">
                  {userInfo.user.isAdmin && (
                    <li>
                      <Link to={"/profile"} className="dropdown-item">
                        All details
                      </Link>
                    </li>
                  )}
                  <li>
                    <Link to={"/userprofile"} className="dropdown-item">
                      Account info
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li className="dropdown-item" onClick={logOutHandler}>
                    <i className="fa-solid fa-right-from-bracket mr-1"></i> Log
                    Out
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
