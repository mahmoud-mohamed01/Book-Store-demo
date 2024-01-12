//import Cart from "../models/cart.js";
import Order from "../models/order.js";
import Product from "../models/product.js";

async function getProducts(req, res) {
  const products = await Product.find();
  res.render("shop/productList", {
    products: products,
    isloggedIn: req.session.isloggedIn,
  });
}

async function getIndex(req,res)
{
  const products = await Product.find();
  res.render("shop/index", {
    products: products,
    isloggedIn: req.session.isloggedIn,
  });

}




async function getCart(req, res) {


  let user=await req.user.populate("cart.items.productId");

  console.log(user);


  res.render("shop/cart", {
    products: user.cart.items,
    isloggedIn: req.session.isloggedIn,
  });
}
 


async function postCart(req, res) {

  let productId=req.body.productId;
  await req.user.addToCart(productId);
    res.redirect("/cart");
 

}

async function deleteFromCart(req,res){
  let{id}=req.body;
  await req.user.deleteFromCart(id);

  res.redirect("/cart")
}
  



async function getOrders(req, res) {
  
  
   let orders = await Order.find({ "user.userId" : req.user._id});
  res.render("shop/orders", {
    orders: orders,
    isloggedIn: req.session.isloggedIn,
  });
}




async function postOrder(req,res)
{

  let user = await req.user.populate("cart.items.productId");
  let arr=user.cart.items;


  let productsArr=[];
  arr.forEach(a=>
    {

      console.log("this is arr :");
      console.log(a);

      productsArr.push({quantity:a.quantity, product:{...a.productId._doc}});

    })


    let order=new Order(
      {
        products:productsArr,
        user:{
          email:req.user.email,
          userId:req.user._id
        }});

        await order.save();


        req.user.cart.items=[];

        await user.save();

    
  

  res.redirect("/orders",);
  
} 


async function getProduct(req,res){
  let id = req.params.id;
  const product= await Product.findById(id);
  res.render("shop/productDetail.ejs", {
    product: product,
    isloggedIn: req.session.isloggedIn,
  });
}

export { getProducts, getIndex, getProduct, postCart, getCart, deleteFromCart,postOrder,getOrders};//getCart,,,,,};
