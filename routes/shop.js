import express from "express";
import { getProducts, getIndex ,getProduct,postCart,getCart,deleteFromCart,postOrder,getOrders} from "../Controllers/shop.js";//,,,, , } 
import isAuth from "../midelware/isAuth.js";
const router = express.Router();


router.get("/",getIndex);
router.get("/products",getProducts);
router.get("/products/:id",getProduct);


router.get("/cart",isAuth,getCart );
router.post("/cart", isAuth,postCart);

router.post("/deletFromCart",isAuth,deleteFromCart);

router.get("/orders", isAuth,getOrders);

router.post("/post-order",isAuth,postOrder);

//router.get("/checkout" );


export default router;
