import React ,{ useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductUp from "../../components/modal/ProductUp";
import { useDispatch } from 'react-redux';
import { modalOpenReq } from '../../redux/slices/modalSlice';

function ProfileInfo() {
  const dispatch = useDispatch();

  const openModal = () => {
    dispatch(modalOpenReq());
  };
  
  return (
    <div>
      <div className="profile-info d-flex align-items-center justify-content-between">
          <div className="d-flex gap-3 align-items-center ">
            <div className="profile-avatar">
              <img
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                alt="profile"
                className="profile-img"
              />
            </div>
            <h3>Hello, User</h3>
          </div>
          <>
            <div className="btn btn-primary btn-sm" onClick={openModal}>+Add new product</div>
          </>
        </div>
        <ProductUp />
      <ToastContainer autoClose ={5000}/>
    </div>
  )
}

export default ProfileInfo
