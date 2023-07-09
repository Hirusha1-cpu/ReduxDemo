
import { cartActions } from "./cart-slice"
import { uiActions } from "./ui-slice"

export const fetchData = () =>{
    return async(dispatch) =>{
        const fetchHandler = async() => {
            const res = await fetch("https://redux-http-d8543-default-rtdb.firebaseio.com/cartitems.json")
            const data = await res.json();
            return data;
        }
        try {
            const cartData = await fetchHandler();
            dispatch(cartActions.replaceData(cartData))


        } catch (error) {
            dispatch(uiActions.showNotification({
                open: true,
                message: 'Sending Request failed',
                type: 'error'
              }))
        }

    }
}


export const sendCardData = (cart) =>{
    return async(dispatch) =>{
        dispatch(uiActions.showNotification({
            open: true,
            message: 'Sending Request',
            type: 'warning'
          }))
          //await for go to database
          const sendRequest = async () => {
    
            const res = await fetch('https://redux-http-d8543-default-rtdb.firebaseio.com/cartitems.json', {
              method: "PUT",
              body: JSON.stringify(cart)
            })
             const data = await res.json();
             console.log(data);
            //send state as request is successfull
            
            dispatch(uiActions.showNotification({
              open: true,
              message: 'Sending Request to database Successfully',
              type: 'success'
            }))
      
          }
          try {
            await sendRequest();
          } catch (error) {
            dispatch(uiActions.showNotification({
                open: true,
                message: 'Sending Request failed',
                type: 'error'
              }))
          }
    }

 }