import React, { useEffect, useState } from "react";
import CartProdCard from "../../components/product_card/CartProdCard";
import Summary from "../../components/order_summary/Summary";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../redux/slices/cartSlice";

function Cart() {
  const dispatch = useDispatch();
  const [allItems, setAllItems] = useState([]);

  const itemsInCart = useSelector((state) => state.cart.items);
  useEffect(() => {
    setAllItems(itemsInCart);

    if(itemsInCart === ""){
      window.location.reload()
    }
  }, [itemsInCart]);

  const deleteAllItmes = () => {
    dispatch(clearCart())
  }
  return (
    <div>
      <section className="h-100 gradient-custom">
        <div className="container py-5">
          <div className="row d-flex justify-content-center my-4">
            <div className="col-md-8">
              <div className="card mb-4">
                <div className="card-header py-3 d-flex justify-content-between">
                  <h5 className="mb-0">Item List</h5>
                  <button className="btn btn-danger" onClick={deleteAllItmes}>Clear cart</button>
                </div>
                <div className="card-body">
                  {allItems.map((item, index) => {
                    return (
                      <div key={index}>
                          <CartProdCard propData={item} />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <Summary propData={allItems}/>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Cart;
