import Product from "../models/product.js";

import mongodb from "mongodb";

function getAddProductPage(req, res) {

  
  res.render("Admin/editProduct.ejs", {
    edit: false,
    isloggedIn: req.session.isloggedIn,
  });
}

async function addProduct(req, res) {
  const{title, imageUrl, price, description} =req.body;

  let product=new Product({title:title,price:price,description:description,imageUrl:imageUrl,userID:req.user._id});
  await product.save();
  res.redirect("/");
}



async function getEditProductPage(req, res) {

  let id= req.params.id;
  let product= await Product.findById(id);
  res.render("Admin/editProduct.ejs", {
    product: product,
    edit: true,
    isloggedIn: req.session.isloggedIn,
  });
}

async function editProduct(req,res)
{
  
    const {title, imageUrl, price, description,id } = req.body;
    let product=await Product.findById(id);
    product.title=title;
    product.price=price;
    product.imageUrl=imageUrl;
    product.description=description;
    


    await product.save()


     res.redirect("/Admin/products");

}


async function deleteProduct(req,res)
{
  let id=req.params.id;
  await Product.findByIdAndDelete(id); 
  res.redirect("/Admin/products"); 
}





async function getProducts(req, res) {
  const products = await Product.find();

  res.render("Admin/products", {
    products: products,
    isloggedIn: req.session.isloggedIn,
  });
}


export { getAddProductPage, addProduct, getProducts, deleteProduct,getEditProductPage ,editProduct};//,,editProduct,deleteProduct };