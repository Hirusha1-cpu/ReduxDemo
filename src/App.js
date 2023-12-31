import React, { useEffect } from "react";
import "./App.css";
import Auth from "./components/Auth";
import Layout from "./components/Layout";
import { useDispatch, useSelector } from "react-redux";
import Notification from "./components/Notification";
import { uiActions } from "./store/ui-slice";
import { fetchData, sendCardData } from "./store/cart-actions";
let isFirstRender = true;

function App() {
  const dispatch = useDispatch();
  const notification = useSelector(state => state.ui.notification);
  const cart = useSelector(state => state.cart);
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  useEffect(()=>{
    dispatch(fetchData())
  },[dispatch])
  useEffect(() => {
    if (isFirstRender) {
      isFirstRender = false;
      return;
    }
    if(cart.changed){
      dispatch(sendCardData(cart));
    }
    // dispatch(sendCardData(cart));
    // const sendRequest = async () => {
    //   // send state as sending request
    //   // dispatch(uiActions.showNotification({
    //   //   open: true,
    //   //   message: 'Sending Request',
    //   //   type: 'warning'
    //   // }))
    //   const res = await fetch('https://redux-http-d8543-default-rtdb.firebaseio.com/cartitems.json', {
    //     method: "PUT",
    //     body: JSON.stringify(cart)
    //   })
    //   const data = await res.json();
    //   //send state as request is successfull
    //   dispatch(uiActions.showNotification({
    //     open: true,
    //     message: 'Sending Request to database Successfully',
    //     type: 'success'
    //   }))

    // }

   // sendRequest().catch(err => {
      //send state as an error occured
      // dispatch(uiActions.showNotification({
      //   open: true,
      //   message: 'Sending Request failed',
      //   type: 'error'
      // }))
  //  });

  }, [cart,dispatch])
  // console.log(isLoggedIn);
  // const cartItems = useSelector((state)=> state.cart.itemsList)
  // console.log(cartItems);
  return (
    <div className="App">
      {notification && <Notification type={notification.type} message={notification.message} />}
      {!isLoggedIn && <Auth />}
      {isLoggedIn && <Layout />}

      {/* <Layout /> */}
    </div>
  );
}

export default App;
