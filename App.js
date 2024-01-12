import express from "express";
import shop from "./routes/shop.js";
import admin from "./routes/admin.js";
import auth from"./routes/auth.js";
import errorPage from"./Controllers/error.js"
import mongoose from "mongoose";
import session from "express-session";
import User from "./models/user.js";
import mongodbStore from "connect-mongodb-session";
import flash from"connect-flash";
import csrf from "csurf";


const app = express();
const port = 3000;

const dbStore= mongodbStore(session);

const csrfProtection=csrf();

const sessionStore = new dbStore({
  uri: "mongodb+srv://admin-mahmoud:mahmoud123@cluster0.rkskfqb.mongodb.net/bookStoreShop",
  collection:"sessions"
});



app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(session({secret:"this isSecret",resave:false,saveUninitialized:false,store:sessionStore}));


app.use(csrfProtection);
app.use(flash());


app.use(async (req, res, next) => {
  if(!req.session.user)
  {
    return next();
  }
  let id=req.session.user._id;
  let user = await User.findById(id);
  console.log(user);
  req.user =  user;
  res.locals.userType = req.user.userType;

 next();
});

app.use((req, res, next)=>
{
  res.locals.csrfToken=req.csrfToken();
  if(req.user==undefined){
       res.locals.userType="normalUser";
  }
  next();

});

app.use(shop);
app.use("/Admin", admin);
app.use(auth);



app.get("*",errorPage)





 app.listen(port,async (req, res) => {

    await mongoose.connect("mongodb+srv://admin-mahmoud:mahmoud123@cluster0.rkskfqb.mongodb.net/bookStoreShop");
      console.log("Server started on port " + port);
 });

