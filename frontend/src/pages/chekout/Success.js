import React from "react";
import { Link } from "react-router-dom";

function Success() {
  return (
    <div className="container mt-5">
      <div class="alert alert-success" role="alert">
        <h4 class="alert-heading">Payment ID : 1100110009090</h4>
        <p>
          Payment successful
        </p>
        <hr />
        <p class="mb-0">
          You can securely close this window. <Link to={'/home'} className='text-decoration-underline text-black'>Back to home{">"}</Link> 
        </p>
      </div>
    </div>
  );
}

export default Success;
