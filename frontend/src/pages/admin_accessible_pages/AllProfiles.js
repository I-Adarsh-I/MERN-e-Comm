import React, { useEffect, useState } from "react";
import ProfileInfo from "../../components/profile_info/ProfileInfo";
import { BASE_API } from "../../config";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Modal, Button, Table } from "react-bootstrap";

function AllOrders() {
  const [allProfiles, setAllProfiles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [userIdInput, setUserIdInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [userDetailNotFound, setUserDetailNotFound] = useState(false);
  const token = localStorage.getItem("Auth token");

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = (profile) => {
    setSelectedProfile(profile);
    setShowModal(true);
  };

  const handleUserIdChange = (event) => {
    setUserIdInput(event.target.value);
  };

  // Get user by userID
  const handleSubmit = async (event) => {
    event.preventDefault();

    if(!userIdInput || userIdInput.length<24){
      return toast.error('Please enter a user ID')
    }

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("Auth token")}`,
        },
      };

      const resp = await axios.get(`${BASE_API}/user/${userIdInput}`, config);

      if (resp.status === 200) {
        handleShowModal(resp.data.user);
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setUserDetailNotFound(true);
        setErrorMessage("User ID is incorrect.");
      } else {
        console.log(err);
      }
    }
  };

  //Get all profiles
  const allProfilesInfo = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };
    try {
      const resp = await axios.get(`${BASE_API}/allusers`, config);
      if (resp.status === 200) {
        return setAllProfiles(resp.data.users);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    allProfilesInfo();
  }, []);

  // Remove a user
  const removeUser = async (userId) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      };

      const resp = await axios.delete(
        `${BASE_API}/removeuser/${userId}`,
        config
      );
      if (resp.status === 200) {
        console.log(resp.data.message);
        window.location.reload();
        return;
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <div className="top-card mt-3">
        <ProfileInfo />
      </div>
      <div className="all-orders-sec mt-5 overflow-auto">
        <h3 className="text-center mb-4">All profiles</h3>
        <table className="table table-striped w-100">
          <thead>
            <tr>
              <th scope="col">Profile ID</th>
              <th scope="col">Profile Name</th>
              <th scope="col">Email</th>
              <th scope="col">Admin Status</th>
              <th scope="col">Other options</th>
            </tr>
          </thead>
          <tbody>
            {allProfiles.map((profile) => (
              <tr key={profile._id}>
                <th scope="row">{profile._id}</th>
                <td>{profile.name}</td>
                <td>{profile.email}</td>
                <td>{profile.isAdmin ? "Admin" : "User"}</td>
                <td className="d-flex gap-2">
                  <Button
                    variant="outline-success"
                    size="sm"
                    onClick={() => handleShowModal(profile)}
                  >
                    <i
                      class="fa-regular fa-eye"
                      style={{ color: "#00000" }}
                    ></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="container">
          <form onSubmit={handleSubmit} className="mt-5">
            <div class="form-floating mb-3">
              <input
                type="text"
                class="form-control"
                id="floatingInput"
                placeholder="ID: 11009I0909KHG"
                value={userIdInput}
                onChange={handleUserIdChange}
              />
              <label for="floatingInput">User ID</label>
            </div>
            <button className="btn btn-sm btn-primary" type="submit">
              Search
            </button>
            {errorMessage && (
          <p className="text-danger">{errorMessage}</p>
        )}
          </form>
        </div>
      </div>
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        {selectedProfile && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>User Profile: {selectedProfile._id}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="container row">
                <div className="col-md-6">
                  <div className="r-sec">
                    <img
                      src={selectedProfile.profileImage}
                      alt={selectedProfile.name}
                      className="img-fluid rounded-circle"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="r-sec d-flex flex-column gap-2">
                    <div>
                      <span className="h6">Name:</span> {selectedProfile.name}
                    </div>
                    <div>
                      <span className="h6">Email:</span> {selectedProfile.email}
                    </div>
                    <div>
                      <span className="h6">Admin Status:</span>{" "}
                      {selectedProfile.isAdmin ? "Admin" : "User"}
                    </div>
                  </div>
                  {selectedProfile.isAdmin ? (
                    <button className="btn btn-primary btn-sm mt-4" disabled>
                      Admin
                    </button>
                  ) : (
                    <button
                      className="btn btn-danger btn-sm mt-4"
                      onClick={() => removeUser(selectedProfile._id)}
                    >
                      Remove user
                    </button>
                  )}
                </div>
              </div>
            </Modal.Body>
          </>
        )}
      </Modal>

      <ToastContainer autoClose={5000} />
    </div>
  );
}

export default AllOrders;
