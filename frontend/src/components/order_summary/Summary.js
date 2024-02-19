import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Summary(props) {
  const [prodDet, setProdDet] = useState([]);

  useEffect(() => {
    if(props.propData){
      setProdDet(props.propData);
    }
  }, [props.propData]);

  // console.log("is in /checkout?  ", props.propData);

  const totalAmount = prodDet.reduce((total, product) => total + (product.price * product.quantity), 0)

  const handlePayment = () => {
    props.onCheckout(prodDet)
  }

  return (
    <div>
      <div className="card mb-4">
        <div className="card-header py-3 bg-light">
          <h5 className="mb-0">Order Summary</h5>
        </div>
        <div className="card-body">
          <ul className="list-group list-group-flush">
            <li className="list-group-item d-flex flex-column justify-content-between align-items-center border-0 px-0 pb-0 gap-2">
              {prodDet.map((product) => {
                return (
                  <div className="d-flex gap-2 justify-content-between w-100" key={product._id}>
                    {product.name} X {product.quantity}<span>${product.price}</span>
                  </div>
                );
              })}
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center px-0">
              Shipping
              <span>$20</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
              <div>
                <strong>Total amount</strong>
              </div>
              <span>
                <strong>${totalAmount + 20}</strong>
              </span>
            </li>

            {props.checkLoc ? ( 
              <button className="btn btn-dark btn-lg overflow-hidden d-flex align-items-center justify-content-center gap-2"> <img src="./paypal.png" alt="" width={'26px'}/> PayPal</button>
            ): (
            <Link
              to="/checkout"
              className="btn btn-dark btn-lg btn-block container-fluid "
            >
              Go to checkout
            </Link>
              
            )}

          </ul>
        </div>
      </div>
    </div>
  );
}

export default Summary;
