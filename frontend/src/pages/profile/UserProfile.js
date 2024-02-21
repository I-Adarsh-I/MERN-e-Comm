import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_API } from "../../config";
import axios from "axios";
import { loginSuccessful, logout } from "../../redux/slices/userSlice";

function UserProfile() {
  const dispatch = useDispatch();

  const [updateField, setUpdateField] = useState(false);
  const [userInp, setUserInp] = useState("");
  const userInfo = useSelector((state) => state.auth.user);

  const token = localStorage.getItem("Auth token");

  // Editable form
  const editableForm = async (e) => {
    e.preventDefault();
    try {
      const request = {
        name: userInp,
      };

      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      };

      const resp = await axios.put(
        `${BASE_API}/userinfoupdate`,
        request,
        config
      );
      if (resp.status === 200) {
        dispatch(loginSuccessful(resp.data.user));
        return setUpdateField(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const showUpdateField = () => {
    if (updateField) {
      setUpdateField(false);
    } else {
      setUpdateField(true);
    }
  };

  // Logout handler
  const logoutHandler = () => {
    localStorage.removeItem("Auth token");
    localStorage.removeItem("persist:root");
    dispatch(logout());
  };

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-lg-4">
          <div className="d-flex flex-column align-items-center gap-3">
            <div className="profile-avatar2">
              <img
                src="https://i.pinimg.com/736x/c0/74/9b/c0749b7cc401421662ae901ec8f9f660.jpg"
                alt="profile"
                className="profile-img"
              />
            </div>
          </div>
        </div>
        {/* Right Section */}
        <div className="col-lg-8">
          <div className="">
            <h2 className="mb-3 profile-info-text pit-h2">Your profile</h2>
            <p className="profile-info-text ">
              Your profile preferences help us personalize recommandations for
              you.
            </p>
            <div className="card mb-3 extra-card" style={{ backgroundColor: "#F7FAFA" }}>
              <div className="card-body d-flex align-items-center gap-2">
                <h4 className="m-0">Clothing and shoes</h4>
                <div className="v-sep rounded-pill"></div>
                <h6 className="m-0  mt-1 text-muted">Size, fit and price</h6>
              </div>
            </div>
            <h5>About you</h5>
            <hr />
            <div className="mb-3 d-flex flex-column gap-3">
              <div className="d-flex align-items-center gap-3 border-bottom border-secondary border-opacity-50 pb-3">
                <h6 className="m-0">Name: </h6>
                {!updateField && <p className="m-0">{userInfo.name}</p>}
                {updateField && (
                  <form
                    className="d-flex align-items-center gap-2"
                    onSubmit={editableForm}
                  >
                    <input
                      type="text"
                      placeholder={userInfo.name}
                      className="border rounded p-2"
                      value={userInp}
                      onChange={(e) => setUserInp(e.target.value)}
                    />
                    <button
                      className="btn btn-primary btn-sm p-2"
                      type="submit"
                      onClick={(e) => editableForm(e)}
                    >
                      Update
                    </button>
                  </form>
                )}
              </div>
              <div className="d-flex align-items-center gap-3 border-bottom border-secondary border-opacity-50 pb-3">
                <h6 className="m-0">Email: </h6>
                <p className="m-0">{userInfo.email}</p>
              </div>
              <div className="d-flex align-items-center gap-3 border-bottom border-secondary border-opacity-50 pb-3">
                <h6 className="m-0">Account type: </h6>
                <p className="m-0">
                  {userInfo.isAdmin ? "Admin account" : "Customer account"}
                </p>
              </div>
            </div>
          </div>
          <div className="d-flex gap-2 option-buttons">
            <button
              className="btn btn-outline-primary btn-sm"
              onClick={showUpdateField}
            >
              Edit profile
            </button>
            <button
              className="btn btn-outline-danger btn-sm"
              onClick={logoutHandler}
            >
              logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
