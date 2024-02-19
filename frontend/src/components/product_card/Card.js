import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { addItem, updateItemQuantity } from '../../redux/slices/cartSlice';

function Card(props) {
  const dispatch = useDispatch();

  const cartItems = useSelector(state => state.cart.items)

  const addToCart = () => {
    const existingItem = cartItems.find(item => item._id === props.propData._id);

    if (existingItem) {
      dispatch(updateItemQuantity({ id: props.propData._id, quantity: 1 }));
    } else {
      dispatch(addItem({ ...props.propData, quantity: 1 }));
    }
    // console.log("_id: ",props.propData._id)
    // console.log("existing Item: ",existingItem)
  }

  return (
    <div>
        <div className="card text-center">
          <img className="card-img-top p-3" src={props.propData.image} alt="Card" width={200} />
          <div className="card-body p-0">
            <h5 className="card-title">{props.propData.name}</h5>
            <p className="card-text" style={{fontSize:'14px'}}>
            {props.propData.description}
            </p>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">$10</li>
          </ul>
          <div className="card-body">
            <Link className="btn btn-dark m-1">
              Buy Now
            </Link>
            <button className="btn btn-dark m-1" onClick={addToCart}>Add to Cart</button>
          </div>
        </div>
    </div>
  )
}

export default Card
