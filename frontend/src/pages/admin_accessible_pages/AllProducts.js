import React, { useEffect, useState } from "react";
import ProfileInfo from "../../components/profile_info/ProfileInfo";
import { BASE_API } from "../../config";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";

function AllOrders() {
  const [allProducts, setAllProducts] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //Get all products
  const allProductInfo = async () => {
    const token = localStorage.getItem("Auth token");

    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };
    try {
      const resp = await axios.get(`${BASE_API}/allproducts`, config);
      if (resp.status === 200) {
        setAllProducts(resp.data.products);
      }
      // console.log(resp.data.products)
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    allProductInfo();
  }, []);

  //Remove products
  const removeProduct = async (productID) => {
    const token = localStorage.getItem("Auth token");

    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };
    try {
      const resp = await axios.delete(
        `${BASE_API}/removeproduct/${productID}`,
        config
      );
      if (resp.status === 200) {
        toast.success(resp.data.message);
        allProductInfo();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleTableRowClick = (product) => {
    setSelectedProduct(product);
    handleShow();
  };

  return (
    <div className="container">
      <div className="top-card mt-3">
        <ProfileInfo />
      </div>
      <div className="all-orders-sec mt-5">
        <h3 className="text-center mb-4">All products</h3>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Product ID</th>
              <th scope="col">Product Name</th>
              <th scope="col">Description</th>
              <th scope="col">Price</th>
              <th scope="col">Other options</th>
            </tr>
          </thead>
          <tbody role="button">
            {allProducts.map((product) => (
              <tr
                key={product._id}
                onClick={() => handleTableRowClick(product)}
              >
                <th scope="row" className="text-muted">
                  {product._id}
                </th>
                <td>{product.name}</td>
                <td className="text-truncate" style={{ maxWidth: "80px" }}>
                  {product.description}
                </td>
                <td>{product.price}</td>
                <td className="d-flex gap-2">
                  <button
                    className="btn btn-danger"
                    onClick={() => removeProduct(product._id)}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        {selectedProduct && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>
                {" "}
                <h5>Product ID: {selectedProduct._id}</h5>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="d-flex justify-content-around">
                <div className="r-sec">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    style={{ width: "100px", height: "100px" }}
                  />
                </div>
                <div className="r-sec d-flex flex-column gap-2">
                  <div><span className="h6">Name:</span> {selectedProduct.name}</div>
                  <div><span className="h6">Description:</span> {selectedProduct.description}</div>
                  <div><span className="h6">Price:</span> ${selectedProduct.price}</div>
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
