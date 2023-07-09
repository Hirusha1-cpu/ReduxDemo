import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui-slice";
import { useDispatch, useSelector } from "react-redux";

 const cartSlice = createSlice({
   
    name:'cart',
    initialState:{
        itemsList:[],
        totalQuantity:0,
        IsShowCart: false,
        changed:false
    },
    reducers:{
        replaceData(state,action){
            ////////////////////////////////////////////////////
            state.totalQuantity = action.payload.totalQuantity;
            state.itemsList = action.payload.itemsList;
        },
        addToCart(state,action){
            state.changed = true;
            const newItem = action.payload;
            //to check if the item is already in the cart or not
            const existingItem = state.itemsList.find(item => item.id === newItem.id);
            console.log(existingItem);

            if(existingItem){
                existingItem.quantity++;
                existingItem.totalPrice += newItem.price;
                

            }else{
                state.itemsList.push({
                    id:newItem.id,
                    price:newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price,
                    name:newItem.name

                });
                state.totalQuantity++;
            }
        },
        removeFromCart(state, action){
            state.changed = true;
            const itemsz = action.payload;
            const existingItem = state.itemsList.find(item => item.id === itemsz.id);
            console.log(existingItem);
            if(existingItem.quantity === 1){
                state.itemsList = state.itemsList.filter((item) => item.id!== itemsz.id);
                state.totalQuantity--;
            }else{
                existingItem.quantity--;
                existingItem.totalPrice -= existingItem.price;
            }
        },
        // removeFromCart(state, action) {
        //     const id = action.payload;
        //     const existingItemIndex = state.itemsList.findIndex((item) => item.id === id);
          
        //     if (existingItemIndex !== -1) {
        //       const existingItem = state.itemsList[existingItemIndex];
        //       if (existingItem.quantity === 1) {
        //         state.itemsList.splice(existingItemIndex, 1);
        //       } else {
        //         existingItem.quantity--;
        //         existingItem.totalPrice -= existingItem.price;
        //       }
        //       state.totalQuantity--;
        //     }
        //   },
        setShowCart(state){
            state.IsShowCart=true;
        },
        setNoShowCart(state){
            state.IsShowCart=false;
        },
    }
 })

// export const sendCardData = (cart) =>{
//     return async(dispatch) =>{
//         dispatch(uiActions.showNotification({
//             open: true,
//             message: 'Sending Request',
//             type: 'warning'
//           }))
//           //await for go to database
//           const sendRequest = async () => {
    
//             const res = await fetch('https://redux-http-d8543-default-rtdb.firebaseio.com/cartitems.json', {
//               method: "PUT",
//               body: JSON.stringify(cart)
//             })
//              const data = await res.json();
//              console.log(data);
//             //send state as request is successfull
            
//             dispatch(uiActions.showNotification({
//               open: true,
//               message: 'Sending Request to database Successfully',
//               type: 'success'
//             }))
      
//           }
//           try {
//             await sendRequest();
//           } catch (error) {
//             dispatch(uiActions.showNotification({
//                 open: true,
//                 message: 'Sending Request failed',
//                 type: 'error'
//               }))
//           }
//     }

//  }
 
 export const cartActions = cartSlice.actions;
 export default cartSlice;