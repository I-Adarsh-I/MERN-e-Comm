import React, { useEffect, useState } from "react";
import Card from "../../components/product_card/Card";
import "./product.css";
import { BASE_API } from "../../config";
import axios from "axios";
import { useSelector } from "react-redux";


function Products() {

  const [allProducts, setAllproducts] = useState([]);

  const fetchAllProducts = async () => {
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
        setAllproducts(resp.data.products);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  // useEffect(() => {
  //   console.log(allProducts);
  // }, [allProducts]);

  const isAdmin = useSelector((state) => state.auth.user.isAdmin);

  return (
    <div className="container">
      {isAdmin && (
        <>
          <div
            className="alert alert-primary d-flex justify-content-between align-items-center mt-3"
            role="alert"
          >
            <p className="m-0">Add a new products</p>
            <button className="btn btn-sm btn-primary">+Add new product</button>
          </div>
        </>
      )}

      <h1 className="text-center my-3">All products</h1>
      <div className="row row-cols-1 row-cols-md-5 g-3 pro-card-container">
        {allProducts.map((product) => {
          return (
            <div key={product._id}>
              <Card propData={product} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Products;
