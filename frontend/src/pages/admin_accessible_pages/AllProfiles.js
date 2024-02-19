import React from "react";
import ProfileInfo from "../../components/profile_info/ProfileInfo";

function AllOrders() {
  return (
    <div className="container">
      <div className="top-card mt-3">
        <ProfileInfo />
      </div>
      <div className="all-orders-sec mt-5">
        <h3 className="text-center">All profiles</h3>
        <table class="table table-striped">
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
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td className="d-flex gap-2">
                <button className="btn btn-danger">
                  <i class="fa-solid fa-trash"></i>
                </button>
              </td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
              <td className="d-flex gap-2">
                <button className="btn btn-danger">
                  <i class="fa-solid fa-trash"></i>
                </button>
              </td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td colspan="2">Larry the Bird</td>
              <td>@twitter</td>
              <td className="d-flex gap-2">
                <button className="btn btn-danger">
                  <i class="fa-solid fa-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllOrders;
