import React from "react";
import { Link } from "react-router-dom";

function Success() {
  return (
    <div className="container mt-5">
      <div class="alert alert-danger" role="alert">
        <h4 class="alert-heading">Payment Failed</h4>
        <p>
          Oops! Something went wrong
        </p>
        <hr />
        <p class="mb-0">
          Sorry this payment cannot be completed <Link to={'/checkout'} className='text-decoration-underline text-black'>Back to home{">"}</Link> 
        </p>
      </div>
    </div>
  );
}

export default Success;
