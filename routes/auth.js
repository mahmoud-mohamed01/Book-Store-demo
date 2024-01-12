import express from "express";
import { getLogin, getNewPassword, getResetPassword, getSignUp, postLogOut, postLogin, postResetPassword, postSignUp, psotNewPassword } from "../Controllers/auth.js";

let router=express.Router()
router.get("/login",getLogin);
router.post("/login", postLogin);
router.post("/logout",postLogOut);
router.get("/signup",getSignUp);
router.post("/signup",postSignUp);
router.get("/resetPassword",getResetPassword);
router.post("/resetPassword", postResetPassword);
router.get("/resetPassword/:token", getNewPassword);
router.post("/newPassword",psotNewPassword);





export default router;