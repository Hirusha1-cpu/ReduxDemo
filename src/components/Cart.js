import React from "react";
import "./Cart.css";
import { useDispatch, useSelector } from "react-redux";

import { authActions } from "../store/auth-slice";
import { cartActions } from "../store/cart-slice";

const Cart = () => {
  const quantity = useSelector(state=> state.cart.totalQuantity);
  // const showCart = useSelector(state => state.cart.IsShowCart)

  const dispatch = useDispatch()
  const handleClick = (e) =>{
    e.preventDefault()
    dispatch(authActions.logout())

  }
  const showCart = (e) =>{
  
    dispatch(cartActions.setShowCart())
   
  }
  const NoShowCart = (e) =>{
  
    dispatch(cartActions.setNoShowCart())
   
  }
  const showCart1 = useSelector(state => state.cart.IsShowCart)
  return (
    <div className="cartIcon">
      
      <h3 onClick={showCart}>Cart: {quantity} Items</h3>
     {showCart1 && <h3 onClick={NoShowCart}>Close Cart</h3> } 
      {/* <button onClick={handleClick}>Back</button> */}
    </div>
  );
};

export default Cart;
