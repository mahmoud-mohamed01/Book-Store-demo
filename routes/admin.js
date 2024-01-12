import express from "express";
import { addProduct, getAddProductPage,getProducts,deleteProduct,getEditProductPage,editProduct} from "../Controllers/admin.js";//,getEditProductPage,, } 
import isAuth from "../midelware/isAuth.js";
import isAdmin from "../midelware/isAdmin.js";

const router = express.Router();

//get page
router.get("/addProduct",isAdmin,isAuth,getAddProductPage );
router.get("/products", isAdmin,isAuth,getProducts);


//post route
router.post("/addProduct",isAdmin,isAuth,addProduct);
router.get("/editProduct/:id",isAdmin,isAuth,getEditProductPage);
router.post("/editProduct", isAdmin,isAuth,editProduct);
router.post("/deleteProduct/:id",isAdmin,isAuth, deleteProduct);




export default router;

