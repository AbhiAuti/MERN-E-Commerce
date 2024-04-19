import React,{useContext} from "react"
import { Shopcontext } from "../Context/Shopcontext"
import {TbTrash} from "react-icons/tb"

const Cartitem = () => {

    const { gettotalcartamount,all_products, cartitems , removefromcart}=useContext(Shopcontext);

    const handleBuyNow = async () => {
        // Example data; replace with your actual backend API call to create an order
        const orderData = {
            id: "order_HA632Dh234"+all_products.id,
            currency: "INR",
            amount:all_products.new_price * 100, // assuming `product.price` is in rupees
        };
        const options = {
        key: "rzp_test_tZ0LLC8YyP7PDt", // Enter the Key ID generated from the Dashboard
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Your Company Name",
        description: all_products.name,
        order_id: orderData.id,
        handler: function (response) {
            // handle the payment success
            alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
        },
        prefill: {
            name: "Gaurav Kumar",
            email: "gaurav.kumar@example.com",
            contact: "9999999999" 
        },
        theme: {
            color: "#3399cc"
        }
    };
    
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    };
    



  return (
   <section className="max_padd_container pt-28">
    <table className="w-full mx-auto">
       
        <thead>
            <tr className="bg-slate-900/10 regular-18 sm:regular-22 text-start py-12">
                <th className="p-1 py-2">Product</th>
                <th className="p-1 py-2">Title</th>
                <th className="p-1 py-2">Price</th>
                <th className="p-1 py-2">Quantity</th>
                <th className="p-1 py-2">Total</th>
                <th className="p-1 py-2">Remove</th>
            </tr>
        </thead>
        <tbody>
            {all_products.map((e)=>{
                if(cartitems[e.id]>0){
                    return <tr key={e.id} className="border-b border-slate-900/20 text-gray-30 p-6 medium-14 text-center">
                        <td className="flexCenter"><img src={e.image} alt="productimg" height={43} width={43} className="rounded-lg ring-1 ring-slate-900/5 my-1"/></td>
                        <td><div className="line-clamp-3">{e.name}</div></td>
                        <td>${e.new_price}</td>
                        <td className="w-16 h-16 bg-white">{cartitems[e.id]}</td>
                        <td>${e.new_price * cartitems[e.id]}</td>
                        <td><div className="bold-22 pl-14"><TbTrash onClick={()=>removefromcart(e.id)}/></div></td>
                    </tr>
                }
                return null;
            })}
        </tbody>
        </table>
   {/* cart detials */}
<div className="flex flex-col gap-20 my-16 p-8 md:flex-row rounded-md bg-white w-fullmax-w-[666px]">
    <div className="flex flex-col gap-10">
        <h4 className="bold-20">summary</h4>
        <div>
            <div className="flexBetween py-4">
                <h4 className="medium-16">subtotal:</h4>
                <h4 className="text-gray-30 font-semibold">${gettotalcartamount()}</h4>
            </div>
            <hr />
            <div className="flexBetween py-4">
                <h4 className="medium-16">Shipping fee:</h4>
                <h4 className="text-gray-30 font-semibold">${0}</h4>
            </div>
            <div className="flexBetween py-4 ">
                <h4 className="bold-18">Total:</h4>
                <h4 className="bold-18">${gettotalcartamount()}</h4>
            </div>
        </div>
        <button onClick={handleBuyNow} className="btn_dark_rounded w-44">Checkout</button>
        <div className="flex flex-col gap-10">
            <h4 className="bold-20 capitalize">Your coupon code enter here:</h4>
            <div className="flexBetween pl-15 h-12 bg-primary rounded-full ring-1 ring-slate-900/10">
                <input type="text" placeholder=" coupon code" className="bg-transparent border-none outline-mone"/>
                <button className="btn_dark_rounded">Submit</button>
            </div>
        </div>
    </div>
</div>
   </section>
  )
}

export default Cartitem
