import React, { useEffect } from "react";
import { removeItem, updateItemQuantity, decreaseItemQuantity } from "../../redux/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

function CartProdCard(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.items);

  const cartItem = cartItems.find((item) => item._id === props.propData._id); //Item in cart that matches the current product

  const quantity = cartItem ? cartItem.quantity : 0;

  const increaseProductCount = () => {
    dispatch(updateItemQuantity({id: props.propData._id}));
  }

  const decreaseProductCount = () => {
    if(cartItem && cartItem.quantity === 1){
      dispatch(removeItem({id: props.propData._id}));
      
    }else if(cartItem && cartItem.quantity > 1){
      dispatch(decreaseItemQuantity({id: props.propData._id}));
    }
  }

  useEffect(() => {
    if (cartItems.length === 0) {
      window.location.reload();
    }
  }, [cartItems]);

  return (
    <div>
      <div className="row d-flex align-items-center">
        <div className="col-lg-3 col-md-12">
          <div className="bg-image rounded" data-mdb-ripple-color="light">
            <img
              src="https://contents.mediadecathlon.com/p2511365/b56ebd41ddfccff9283ab6dcdbb0b224/p2511365.jpg"
              // className="w-100"
              alt="product-img"
              width={100}
              height={75}
            />
          </div>
        </div>

        <div className="col-lg-5 col-md-6">
          <p>
            <strong>{props.propData.name}</strong>
          </p>
        </div>

        <div className="col-lg-4 col-md-6">
          <div
            className="d-flex mb-4 align-items-center"
            style={{ maxWidth: "300px" }}
          >
            <button className="btn px-3" onClick={decreaseProductCount}>
              <i className="fas fa-minus"></i>
            </button>

            <p className="mx-4 m-0">{quantity}</p>

            <button className="btn px-3" onClick={increaseProductCount}>
              <i className="fas fa-plus"></i>
            </button>
          </div>

          <p className="text-start text-md-center">
            <strong>
              <span className="text-muted">3</span> x {props.propData.price}
            </strong>
          </p>
        </div>
      </div>

      <hr className="my-4" />
    </div>
  );
}

export default CartProdCard;
