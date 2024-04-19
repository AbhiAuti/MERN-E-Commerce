import React, { createContext, useEffect, useState } from "react";

export const Shopcontext = createContext(null);


const getdefaultcart=()=>{
  let cart={};
  for(let index=0;index< 300 + 1;index++){
    cart[index]=0
  }
  return cart;
}
const ShopContextProvider = (props) => {
  const [cartitems ,setcartitem]=useState(getdefaultcart());
  const[all_products,setAll_products]=useState([]);
  
  useEffect(()=>{
    fetch("http://localhost:4000/allproducts").then((response)=>response.json()).then((data)=>setAll_products(data));
    if(localStorage.getItem('auth-token')){
      fetch("http://localhost:4000/getcart",{
        method:'POST',
        headers:{
           Accept: 'application/form-data',
          'auth-token':`${localStorage.getItem('auth-token')}`,
          'Content-Type':'application/json',
        },
        body:"",
      }).then((response)=>response.json()).then((data)=>setcartitem(data));
    }

  },[])
//                payment 
// const handlePayment = () => {
//   const orderUrl = "http://localhost:5000/api/payment/orders";
//   fetch(orderUrl, {
//       method: 'POST',
//       headers: {
//           'Content-Type': 'application/json',
//           // Include any other headers your backend requires
//       },
//       body: JSON.stringify({ amount: product.new_price * 100 })
//   })
//   .then(response => response.json())
//   .then(data => {
//       initPayment(data.data);
//   })
//   .catch(error => {
//       console.error('Error:', error);
//   });
// };

// const initPayment = (data) => {
//   const options = {
//       key: "rzp_test_GHoIzD0aXq81yu", // You need to pass your Razorpay Key ID here
//       amount: data.amount, // This should be same as amount that was sent
//       currency: data.currency,
//       name: "Your Company Name or Product Name",
//       description: "Some description about the transaction",
//       order_id: data.id, // This is obtained in response of create order
//       handler: function (response) {
//           // This function gets called after successful payment
//           verifyPayment(response);
//       },
//       theme: {
//           color: "#3399cc"
//       }
//   };

//   const rzp1 = new Razorpay(options);
//   rzp1.open();
// };

// const verifyPayment = (response) => {
//   const verifyUrl = "http://localhost:5000/api/payment/verify";
//   fetch(verifyUrl, {
//       method: 'POST',
//       headers: {
//           'Content-Type': 'application/json',
//           // Include any other headers your backend requires
//       },
//       body: JSON.stringify({
//           razorpay_order_id: response.razorpay_order_id,
//           razorpay_payment_id: response.razorpay_payment_id,
//           razorpay_signature: response.razorpay_signature
//       })
//   })
//   .then(response => response.json())
//   .then(data => {
//       console.log('Payment verification:', data);
//   })
//   .catch(error => {
//       console.error('Verification error:', error);
//   });
// };



  const AddToCart =(itemId)=>{
    setcartitem((prev)=>({...prev,[itemId]:prev[itemId]+1}));
    if(localStorage.getItem('auth-token')){
      fetch("http://localhost:4000/addtocart",{
        method:'POST',
        headers:{
           Accept: 'application/form-data',
          'auth-token':`${localStorage.getItem('auth-token')}`,
          'Content-Type':'application/json',
        },
        body:JSON.stringify({"itemId":itemId}),
      }).then((response)=>response.json()).then((data)=>console.log(data));
    }
  }
  const removefromcart =(itemId)=>{
    setcartitem((prev)=>({...prev,[itemId]:prev[itemId]-1}))
    if(localStorage.getItem('auth-token')){
      fetch("http://localhost:4000/removefromcart",{
        method:'POST',
        headers:{
           Accept: 'application/form-data',
          'auth-token':`${localStorage.getItem('auth-token')}`,
          'Content-Type':'application/json',
        },
        body:JSON.stringify({"itemId":itemId}),
      }).then((response)=>response.json()).then((data)=>console.log(data));
    }
  }
const gettotalcartamount=()=>{
        let totalamount =0;
        for(const item in cartitems){
          if(cartitems[item]>0){
            let iteminfo =all_products.find((product)=>product.id===Number(item));
            totalamount+=iteminfo.new_price * cartitems[item]
          }
        }
        return totalamount;
}

const gettotalcartitems=()=>{
  let totalitems=0;
  for(const item in cartitems){
    if(cartitems[item]>0){
      totalitems+=cartitems[item];
    }
  }
  return totalitems
}

  const contextValue = { gettotalcartitems,gettotalcartamount,all_products ,cartitems,AddToCart,removefromcart };
  return (
    <Shopcontext.Provider value={contextValue}>
      {props.children}
    </Shopcontext.Provider>
  );
};

export default ShopContextProvider;
