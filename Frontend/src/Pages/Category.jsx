import { MdOutlineKeyboardArrowDown } from "react-icons/md"
import Item from "../Components/Item"
import { useContext } from "react"
import { Shopcontext } from "../Context/Shopcontext"

const Category = ({category,banner}) => {
  const {all_products}=useContext(Shopcontext);

  return (
    <section className="max_padd_container py-12 xl:py-28">
      <div>
        <div>
          <img src={banner} alt="" className="block my-7 mx-auto" />
        </div>
        <div className="flexBetween my-8 mx-2"> 
          <h5><span className="font-bold">Showing Trending </span>out of 57 products</h5>
          <div className="flexBetween max-sm:p-4 gap-x-4 px-8 py-3 rounded-5xl ring-1 ring-slate-900/15">sort by <MdOutlineKeyboardArrowDown/></div>
        </div>
        {/* container */}
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          { all_products.map((item)=>{
            if(item.category===category){
             return <Item key={item.id} id={item.id} image={item.image} name={item.name} new_price={item.new_price}old_price={item.old_price}/> 

            }return null;
          })}
        
        </div>
        <div className="mt-16 text-center">
          <button className="btn_dark_rounded">Load more</button>
    
        </div>
      </div>
    </section>
  )
}

export default Category
