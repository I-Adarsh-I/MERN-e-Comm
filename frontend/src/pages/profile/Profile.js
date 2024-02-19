import React from "react";
import "./profile.css";
import { Link } from "react-router-dom";
import ProfileInfo from "../../components/profile_info/ProfileInfo";

function Profile() {
  return (
    <div className="container">
      <div className="all-options">
        <div className="top-card mt-3">
         <ProfileInfo />
        </div>
        <div className="admin-options mt-5">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
            {/* First Card */}
            <div className="col">
              <Link to={'/productslist'} className='text-decoration-none'>
              <div className="card" role="button">
                <div className="card-body d-flex gap-4">
                  <div className="icon">
                    <img
                      src="https://cdn.iconscout.com/icon/free/png-256/free-product-135-781070.png"
                      alt="All products"
                      className="profile-img"
                    />
                  </div>
                  <p>All products</p>
                </div>
              </div>
              </Link>
            </div>

            {/* Second Card */}
            <div className="col">
              <Link to={'/allorders'} className='text-decoration-none'>
              <div className="card" role="button">
                <div className="card-body d-flex gap-4">
                  <div className="icon">
                    <img
                      src="https://cdn-icons-png.flaticon.com/256/7875/7875867.png"
                      alt="All products"
                      className="profile-img"
                    />
                  </div>
                  <p>All orders</p>
                </div>
              </div>
            </Link>
            </div>

            {/* Third Card */}
            <div className="col">
              <Link to={'/allprofiles'} className='text-decoration-none'>
              <div className="card" role="button">
                <div className="card-body d-flex gap-4">
                  <div className="icon">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/2444/2444417.png"
                      alt="All products"
                      className="profile-img"
                    />
                  </div>
                  <p>All profiles</p>
                </div>
              </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
