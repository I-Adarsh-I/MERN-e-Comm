import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import "./modal.css";
import axios from "axios";
import { BASE_API } from "../../config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ProductUp(props) {

  const navigate = useNavigate()
  const [image, setImage] = useState({ preview: "", data: "" });

  const [inputData, setIndputData] = useState({
    producName: "",
    productDes: "",
    productPrice: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setIndputData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  //handle image select
  const handleImgSelect = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setImage(img);
    console.log(img);
  };

  //   Handle image upload

  const handleImgUp = async () => {
    try {
      let formData = new FormData();
      formData.append("file", image.data);

      const resp = await axios.post(`${BASE_API}/upload`, formData);
      // toast.success("Post created successfully");
      return resp;
    } catch (err) {
      console.error("Error uploading file: ", err);
      throw err; // Rethrow the error for the caller to handle
    }
  };

  //Add new product
  const token = localStorage.getItem("Auth token");

  const addNewProduct = async () => {
    try {

        if(!inputData.producName){
            return toast.error('Product name cannot be empty');
        }else if(!inputData.productDes){
            return toast.error('Please add a description to the product');
        }else if(!inputData.productPrice){
            return toast.error('Please enter price of the product');
        }else if(!image){
            return toast.error('Cannot proceed without image');
        }

      const imgRes = await handleImgUp();

      const request = {
        name: inputData.producName,
        description: inputData.productDes,
        price: inputData.productPrice,
        image: `${BASE_API}/files/${imgRes.data.filename}`
      };

      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      };
      console.log("log for request: ",request)

      const resp = await axios.post(`${BASE_API}/addproduct`, request, config);
      console.log(resp);
      if (resp.status === 201) {
        toast.success(resp.data.message);
        props.showAllProducts();
        props.onClose()
      }
    } catch (err) {
      toast.error(err.response.data.error);
      console.log(err);
    }
  };

  return (
    <Modal
      show={props.isOpen}
      onHide={props.onClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Add new product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container row mb-3">
          {/* Left Section */}
          <div
            className="col-md-6 d-flex flex-column align-items-center"
            role="button"
          >
            {image.preview ? (
              <>
                <div className="uploaded-img-container">
                  <img
                    src={image.preview}
                    className="user-uploaded-img object-fit-cover"
                  />
                </div>
              </>
            ) : (
              <>
                <div className="upload-post-box d-flex flex-column align-items-center justify-content-center">
                  <div className="formbold-mb-5 formbold-file-input">
                    <input
                      type="file"
                      name="file"
                      id="file"
                      accept=".jpg, .png, .jpeg"
                      onChange={handleImgSelect}
                    />
                    <label htmlFor="file">
                      <div className="">
                        <i
                          className="fa-solid fa-cloud-arrow-up"
                          style={{ color: "#878787" }}
                        ></i>
                        <div className="upload-post-text w-100">
                          <p className="m-0 text-nowrap">
                            <a className="upload-post-text link-offset-2 link-underline text-decoration-none ">
                              Upload media from device
                            </a>
                          </p>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
              </>
            )}
          </div>
          {/* Right section */}
          <div className="col-md-6">
            <form className="mb-5">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"

                  placeholder="Product"
                  name="producName"
                  value={inputData.producName}
                  onChange={onChangeHandler}
                />
                <label htmlFor="floatingInput">Product name</label>
              </div>
              <div className="form-floating mb-3">
                <textarea
                  className="form-control"
                  placeholder="Add a description here"

                  name="productDes"
                  value={inputData.productDes}
                  onChange={onChangeHandler}
                  style={{ height: "100px" }}
                ></textarea>
                <label htmlFor="floatingTextarea2">Description</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="number"
                  className="form-control"

                  placeholder="Price"
                  name="productPrice"
                  value={inputData.productPrice}
                  onChange={onChangeHandler}
                />
                <label htmlFor="floatingInput">Price</label>
              </div>
            </form>
            <div className="post-btn d-flex justify-content-end">
              <button className="btn btn-primary" onClick={addNewProduct}>
                Add product
              </button>
            </div>
          </div>
        </div>
        <ToastContainer autoClose={5000} />
      </Modal.Body>
    </Modal>
  );
}

export default ProductUp;
