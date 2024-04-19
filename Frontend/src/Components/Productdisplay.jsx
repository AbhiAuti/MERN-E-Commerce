import { useContext } from "react"
import product_rt_1 from "../assets/product_rt_1.png"
import product_rt_2 from "../assets/product_rt_2.png"
import product_rt_3 from "../assets/product_rt_3.png"
import product_rt_4 from "../assets/product_rt_4.png"
import {MdStar} from "react-icons/md"
import { Shopcontext } from "../Context/Shopcontext"

const Productdisplay = (props) => {

const {product} = props;
const {AddToCart}=useContext(Shopcontext)
//                                  payment gateaway

const handleBuyNow = async () => {
    // Example data; replace with your actual backend API call to create an order
    const orderData = {
        id: "order_HA632Dh234"+product.id,
        currency: "INR",
        amount: product.new_price * 100, // assuming `product.price` is in rupees
    };
    const options = {
    key: "rzp_test_tZ0LLC8YyP7PDt", // Enter the Key ID generated from the Dashboard
    amount: orderData.amount,
    currency: orderData.currency,
    name: "Your Company Name",
    description: product.name,
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
      <section >
        <div className="flex flex-col gap-14 xl:flex-row">
            {/* left side */}
            <div className="flex gap-x-2  xl:flex-1">
                <div className="flex flex-col gap-[7px] flex-wrap">
                    <img src={product_rt_1} alt="product img" className='max-h-[99px]  ' />
                    <img src={product_rt_2} alt="product img" className='max-h-[99px] ' />
                    <img src={product_rt_3} alt="product img" className='max-h-[99px] ' />
                    <img src={product_rt_4} alt="product img" className='max-h-[99px] ' />

                </div>
                <div className="">
                    <img src={product.image} alt="" />
                </div>
            </div>
            {/* right side */}
        <div className="flex-col flex xl:flex-[1.5]">
            <h3 className="h3">{product.name}</h3>
            <div className="flex gap-x-2 text-secondary medium-22">
               < MdStar/>
               < MdStar/>
               < MdStar/>
               < MdStar/>
               <p>{111}</p>
            </div>
            <div className="flex gap-x-6 medium-20 my-4">
                <div className="line-through">{product.old_price}</div>
                <div className="text-secondary">{product.old_price}</div>
                
            </div>
            <div className="mb-4">
                <h4 className="bold-16">select size</h4>
                <div className="flex gap-4 my-3">
                    <div className="ring-2 ring-slate-900 h-10 w-10 flexCenter cursor-pointer">S</div>
                    <div className="ring-2 ring-slate-900/10 h-10 w-10 flexCenter cursor-pointer">M</div>
                    <div className="ring-2 ring-slate-900/10 h-10 w-10 flexCenter cursor-pointer">L</div>
                    <div className="ring-2 ring-slate-900/10 h-10 w-10 flexCenter cursor-pointer">XL</div>
                </div>
                <div className="flex flex-col gap-y-3 mb-4 max-w-[555px]">
                    <button onClick={()=>{AddToCart(product.id)}} className="btn_dark_outline !rounded uppercase regular-14 tracking-widest">Add to cart</button>
                    <button onClick={handleBuyNow} className="btn_dark_outline !rounded uppercase regular-14 tracking-widest">buy it now</button>
                    
                </div>
                <p><span className="medium-16 text-tertiary">Category:</span> women | jacket | winter</p>
                <p><span className="medium-16 text-tertiary">Tags:</span> Modern | Latest </p>
            </div>
        </div>
        </div>
      </section>
  )
}

export default Productdisplay
