const port =4000;
const express=require("express");
const app=express();
const mongoose=require("mongoose");
const jwt =require("jsonwebtoken");
const multer=require("multer");
const path=require("path");
const cors=require("cors");
const { type } = require("os");
app.use(cors({
    origin:["https://deploy-mern-1whq.vercel.app"],
    method:["POST","GET"],
    credentials:true
}));
app.use(express.json());
//                  payment gateway

// const express = require('express');
const Razorpay = require('razorpay');

// const app = express();
app.use(express.json());

const razorpay = new Razorpay({
  key_id: 'rzp_test_tZ0LLC8YyP7PDt',
  key_secret: 'EmZfCnm7csg6pbimBr7Q3Jgk'
});

app.post('/create-order', async (req, res) => {
  try {
    const options = {
      amount: req.body.amount, // amount in the smallest currency unit
      currency: "INR",
      receipt: "receipt_order_74394",
    };
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});




// database connection with mongodb
mongoose.connect("mongodb+srv://ecommerceMern:abhi123@cluster0.qhqumyn.mongodb.net/ecommerce-mern?retryWrites=true&w=majority&appName=Cluster0")

//api creation
app.get("/",(req,res)=>{
    res.send("Express app is running")
})
//image storage engine
const storage=multer.diskStorage({
    destination:"./upload/images",
    filename:(reg,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
})
const upload=multer({storage:storage})
//  creating uploading endpoints for images
app.use('/images',express.static('upload/images'))
app.post("/upload",upload.single('product'),(req,res)=>{
    res.json({
        success:1,
        images_url:`http://localhost:${port}/images/${req.file.filename}`
    })
})
//                  schema for creating products
const product =mongoose.model("product",{
    id:{
        type:Number,
        required:true,
    },
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    new_price:{
        type:Number,
        required:true,
    },
    old_price:{
        type:Number,
        required:true,
    },
    date:{
        type : Date,
        default:Date.now,
    },
    available:{
        type:Boolean,
        default:true,
    }
})

//              creating api for add products           //

app.post('/addproduct',async(req,res)=>{
    let products = await product.find({});
    let id;
    if(products.length>0){
        // let last_product_array =product.slice(-1);
        // let last_product =last_product_array[0];
        // id =last_product.id +1;
        let lastProduct = products[products.length - 1];
            id = lastProduct.id + 1;
    } else {
        id=1;
    }

    const Product = new product({
        id:id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        new_price:req.body.new_price,
        old_price:req.body.old_price,
    });
    console.log(Product);
    await Product.save();
    console.log("Saved")
    res.json({
        success:true,
        name:req.body.name,
    })
})
//              creating api for remove products           //
// app.post('/removeproduct', async(req,res)=>{
//     await product.findByIdAndDelete({id:req.body.id});
//     console.log("removed");
//     res.json({
//         success:true,
//         name:req.body.name,

//     });
// })
//             creating api for remove products  by gpt                      //
app.post('/removeproduct', async (req, res) => {
    try {
        const deletedProduct = await product.findOneAndDelete({ id:req.body.id });
        if (!deletedProduct) {
            return res.status(404).json({ success: false, message: "Product not found." });
        }
        console.log("Removed:", deletedProduct);
        res.json({
            success: true,
            name: deletedProduct.name,
        });
    } catch (error) {
        console.error("Error removing product:", error);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
});

//                       creating api to get all products                     //
app.get('/allproducts',async (req,res)=>{
    let products =await product.find({});
    console.log("all product fetched");
    res.send(products);
})
//              Schema user model                           //
const User =mongoose.model('User',{
    name:{
        type:String,
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
    },
    cartData:{
        type:Object,
    },
    data:{
        type:Date,
        default:Date.now,
    },
})

//              creating endpoint for registering the user              //
app.post('/signup',async(req,res)=>{
    let check=await User.findOne({email:req.body.email});
    if(check){
        return res.status(400).json({success:false,errors:"Existing user found with same email address"});

    }
    let cart ={};
    for(let i=0;i<300;i++){
        cart[i]=0;
    }
    const user =new User ({
        name:req.body.username,
        email:req.body.email,
        password:req.body.password,
        cartData:cart,
    })
    await user.save();
    const data ={
        user:{
            id:user.id
        }
    }
    const token =jwt.sign(data,'secret_ecom');
    res.json({success:true,token})
})

//                creating endpoint for user login                  //
app.post('/login',async(req,res)=>{
    let user=await User.findOne({email:req.body.email});
    if(user){
        const passMatch =req.body.password===user.password;
        if(passMatch){
            const data ={
                user:{
                    id:user.id
                }
            }
            const token =jwt.sign(data,'secret_ecom');
            res.json({success:true,token});
        }else{
            res.json({success:false,errors:"Wrong Password"});
        }
    }else{
        res.json({success:false,errors:"Wrong Email address"})
    }
})

//           creating endpoint for newcollection products
app.get('/newcollections',async(req,res)=>{
    let products =await product.find({});
    let newcollection = products.slice(1).slice(-8);
    console.log("newcollection fetched")
    res.send(newcollection);
})

//              creating endpoint for popular products
app.get('/popularproducts',async(req,res)=>{
    let products =await product.find({category:"men"});
    let popularproducts = products.slice(0,4);
    console.log("popular products fetched")
    res.send(popularproducts);
})


//              creating middleware to fetch user
const fetchUser =async (req,res,next)=>{
    const token =req.header('auth-token');
    if(!token){
        res.status(401).send({errors:"Please authenticate using valid login"})
    }else{
        try{
            const data =jwt.verify(token,'secret_ecom');
            req.user=data.user;
            next();
        }catch(error){
            res.status(401).send({errors:"please authentic using a valid token"})
        }
    }
}

//              creating endpoint for adding products in cartdata
app.post('/addtocart',fetchUser, async(req,res)=>{
    console.log("Added",req.body.itemId)
  let userData=await User.findOne({_id: req.user.id})
   userData.cartData[req.body.itemId]+=1;
   await User.findOneAndUpdate({_id: req.user.id},{cartData: userData.cartData});
   res.send("Added");
});

//              creating endpoint for removing product from cart
app.post('/removefromcart',fetchUser, async(req,res)=>{
    console.log("Removed",req.body.itemId)
    let userData=await User.findOne({_id: req.user.id})
   if(userData.cartData[req.body.itemId]>0)
   userData.cartData[req.body.itemId]-=1;
    await User.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("Removed")
});

//                 creating endpoint for getting cart data                 //
app.post('/getcart',fetchUser, async(req,res)=>{
    console.log("get cart")
    let userData=await User.findOne({_id: req.user.id})
    res.json(userData.cartData);

});
app.listen(port,(error)=>{
    if(!error){
        console.log("server is running on port"+ port);

    }else{
        console.log("error"+error);
    }
})