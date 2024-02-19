import React, { useEffect, useState } from "react";
import ProfileInfo from "../../components/profile_info/ProfileInfo";
import axios from "axios";
import { BASE_API } from "../../config";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function AllOrders() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Get all orders
  const fetchAllOrders = async () => {
    const token = localStorage.getItem("Auth token");

    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };

    try {
      const resp = await axios.get(`${BASE_API}/allorders`, config);
      console.log(resp.data.orders)
      setOrders(resp.data.orders);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);


  const handleRowClick = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="container">
      <div className="top-card mt-3">
        <ProfileInfo />
      </div>
      <div className="all-orders-sec mt-5">
        <h3 className="text-center mb-5">All orders</h3>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Order ID</th>
              <th scope="col">Ordered By</th>
              <th scope="col">Products and Quantity</th>
              <th scope="col">Payment Method</th>
              <th scope="col">Other options</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} onClick={() => handleRowClick(order)}>
                <th scope="row">{order._id}</th>
                <td>{order.orderedBy.name}</td>
                <td>
                  {order.products.map((product) => (
                    <div key={product._id}>
                      {product.product.name} - {product.quantity}
                    </div>
                  ))}
                </td>
                <td>{order.paymentMethod}</td>
                <td className="d-flex gap-2">
                  <button className="btn btn-danger">
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedOrder && (
        <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
          <Modal.Header closeButton>
            <Modal.Title>Order Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>Order ID: {selectedOrder._id}</div>
            <div>Ordered By: {selectedOrder.orderedBy.name}</div>
            <div>Payment Method: {selectedOrder.paymentMethod}</div>
            <div>Shipping Address:</div>
            <div>Address: {selectedOrder.shippingAddress.address}</div>
            <div>City: {selectedOrder.shippingAddress.city}</div>
            <div>Postal Code: {selectedOrder.shippingAddress.postalCode}</div>
            <div>Country: {selectedOrder.shippingAddress.country}</div>
            {/* Render other order details as needed */}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger">
            <i className="fa-solid fa-trash"></i> Delete order
            </Button>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}

export default AllOrders;
