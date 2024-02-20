import React, { useEffect, useState } from "react";
import Summary from "../../components/order_summary/Summary";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_API } from "../../config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { clearCart } from "../../redux/slices/cartSlice";

function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const [allItems, setAllItems] = useState([]);
  const [isInCheckout, setIsInCheckout] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsInCheckout(location.pathname === "/checkout");
  }, [location]);

  const itemsInCart = useSelector((state) => state.cart.items);
  useEffect(() => {
    setAllItems(itemsInCart);
    if (itemsInCart === "") {
      window.location.reload();
    }
  }, [itemsInCart]);

  const [userInfo, setUserInfo] = useState({
    address: "",
    city: "",
    country: "",
    state: "",
    postal: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Checkout function
  const handleCheckout = async (e) => {
    e.preventDefault();

    if (
      !userInfo.address ||
      !userInfo.city ||
      !userInfo.country ||
      !userInfo.postal ||
      !userInfo.state
    ) {
      toast.error("Please enter billing address details");
      return;
    }
    const totalPrice = itemsInCart.reduce(
      (total, item) => total + item.price,
      0
    );

    const token = localStorage.getItem("Auth token");

    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };

    const request = {
      items: itemsInCart.map((item) => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      totalPrice: totalPrice,
    };

    // console.log("item list - ", request);
    setLoading(true);
    try {
      const resp = await axios.post(
        `${BASE_API}/order/payment`,
        request,
        config
      );

      if (resp.status === 200) {
        const approvalUrl = resp.data.approvalUrl;
       
        window.open(approvalUrl, "_blank");

        setLoading(false);
        dispatch(clearCart())

        clearCartFromLocalStorage();
        placeOrder();

        navigate("/allproducts");

      } else {
        navigate("/checkout");
      }
      // console.log(resp);
    } catch (err) {
      console.log(err);
    }
  };

  // console.log(itemsInCart);
  const placeOrder = async () => {
    const token = localStorage.getItem("Auth token");

    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };

    const { address, city, country, state, postal } = userInfo;

    const products = itemsInCart.map(item => ({
      product: item._id, // Product ID
      quantity: item.quantity // Quantity of the product
    }));

    const request = {
      products: products, 
      shippingAddress: {
        address,
        city,
        country,
        state,
        postalCode: postal // Add postalCode field
      },
      paymentMethod: 'PayPal', // default payment method
      taxPrice: 0, // Placeholder for tax price
      shippingPrice: 0, // Placeholder for shipping price
      totalPrice: itemsInCart.reduce((total, item) => total + item.price, 0),
      isPaid: false,
    };


    try {
      const resp = axios.post(`${BASE_API}/placeorder`,request, config);
      
      if(resp.status === 200){
        console.log('working')
        toast.success(resp.data.message)

      }
    } catch (err) {
      toast.error(err.data.error)
    }
  };

  const clearCartFromLocalStorage = () => {
    const persistedData = JSON.parse(localStorage.getItem('persist:root'));

    if (persistedData && persistedData.cart) {
        delete persistedData.cart;
        localStorage.setItem('persist:root', JSON.stringify(persistedData));
    }
};

// useEffect(() => {
//   clearCartFromLocalStorage()
// })

  return (
    <div>
      <div className="container py-5">
        <div className="row my-4">
          <div className="col-md-5 col-lg-4 order-last order-md-last order-sm-first">
            <Summary
              propData={allItems}
              checkLoc={isInCheckout}
              onCheckout={handleCheckout}
            />
          </div>
          <div className="col-md-7 col-lg-8">
            <div className="card mb-4">
              <div className="card-header py-3">
                <h4 className="mb-0">Billing address</h4>
              </div>
              <div className="card-body">
                <form
                  className="needs-validation"
                  noValidate
                  onSubmit={handleCheckout}
                >
                  <div className="row g-3">
                    <div className="col-12 my-1">
                      <label htmlFor="address" className="form-label">
                        Address
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="address"
                        name="address"
                        placeholder="1234 Main St"
                        value={userInfo.address}
                        onChange={onChangeHandler}
                        required
                      />
                      <div className="invalid-feedback">
                        Please enter your shipping address.
                      </div>
                    </div>

                    <div className="col-12">
                      <label htmlFor="city" className="form-label">
                        City
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="city"
                        id="city"
                        placeholder="City"
                        value={userInfo.city}
                        onChange={onChangeHandler}
                        required
                      />
                    </div>

                    <div className="col-md-5 my-1">
                      <label htmlFor="country" className="form-label">
                        Country
                      </label>
                      <br />
                      <select
                        className="form-select"
                        id="country"
                        name="country"
                        value={userInfo.country}
                        onChange={onChangeHandler}
                        required
                      >
                        <option>Choose...</option>
                        <option>India</option>
                      </select>
                      <div className="invalid-feedback">
                        Please select a valid country.
                      </div>
                    </div>

                    <div className="col-md-4 my-1">
                      <label htmlFor="state" className="form-label">
                        State
                      </label>
                      <br />
                      <select
                        className="form-select"
                        id="state"
                        name="state"
                        value={userInfo.state}
                        onChange={onChangeHandler}
                        required
                      >
                        <option>Choose...</option>
                        <option>Karnataka</option>
                      </select>
                      <div className="invalid-feedback">
                        Please provide a valid state.
                      </div>
                    </div>

                    <div className="col-md-3 my-1">
                      <label htmlFor="zip" className="form-label">
                        Zip
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="postal"
                        id="zip"
                        placeholder=""
                        value={userInfo.postal}
                        onChange={onChangeHandler}
                        required
                      />
                      <div className="invalid-feedback">Zip code required.</div>
                    </div>
                  </div>
                  <button
                    className="btn btn-dark btn-lg overflow-hidden d-flex align-items-center justify-content-center gap-2 container-fluid mt-3"
                    type="submit"
                    onClick={(e) => handleCheckout(e)}
                  >
                    <img src="./paypal.png" alt="" width={"26px"} /> PayPal
                    {loading && (
                      <div
                        className="spinner-border spinner-border-sm"
                        role="status"
                      >
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer autoClose={5000} />
    </div>
  );
}

export default Checkout;
