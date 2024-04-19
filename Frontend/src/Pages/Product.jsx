import { useContext } from 'react';
import {Shopcontext} from "../Context/Shopcontext"
import {useParams} from "react-router-dom"
import Producthd from '../Components/Producthd';
import Productdisplay from '../Components/Productdisplay';
import Productdescription from '../Components/Productdescription';
import Relatedproducts from '../Components/Relatedproducts';


const Product = () => {
  const {all_products}=useContext(Shopcontext);
  const {productId}=useParams();
  const product =all_products.find((e)=>e.id===Number(productId));
  if(!product){
    return <div>product not found</div>
  }

  return (
  <section className='max_padd_container py-28'>
    <div>
     <Producthd product={product}/>
     <Productdisplay product={product}/>
      <Productdescription/>
      <Relatedproducts/>
    </div>
  </section>
  )
}

export default Product
