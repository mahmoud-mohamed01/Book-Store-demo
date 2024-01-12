import User from "../models/user.js";
import bcrypt  from"bcrypt";
import nodemailer from "nodemailer";
import crypto from"crypto"

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mahmoudtestacc0@gmail.com",
    pass: "hxyn jstk mdpr enrd",
  },
});

function getLogin(req,res)
{
   console.log(req.session.isloggedIn);

   let messageArr=req.flash("error")
   let error=null;

   if (messageArr.length>0)
   {
    error=messageArr[0];
   }
   res.render("auth/login.ejs", { isloggedIn:req.session.isloggedIn ,error:error});
}

async function postLogin(req, res) {

  let {email,password} = req.body;
  let existUser=await User.findOne({email:email});
  if(!existUser)
  {
    req.flash("error","invalid email");
    return res.redirect("/login");
  }

  let isPasswordCorrect= await bcrypt.compare(password,existUser.password);
  if(isPasswordCorrect)
  {
    req.session.user = existUser;
    req.session.isloggedIn = true;
    res.redirect("/");
  }
  else
  {
     req.flash("error", "invalid password");
     res.redirect("/login");
  }
  
}

function postLogOut(req,res)
{
    req.session.destroy(()=>{

        res.redirect("/");
    });
}

async function postSignUp(req,res){
    let { email, password, confirmPassword } = req.body;

    let existUser=await User.findOne({email:email});
    if(existUser)
    {
        req.flash("error", "email already exist");
        return res.redirect("/signup");
    }

    if(password != confirmPassword)
    {
             req.flash("error", "passwords must match");
             return res.redirect("/signup");
    }

    let hashedPassword=await bcrypt.hash(password,12);
    let user= new User({email:email,password:hashedPassword,cart:{items:[]},userType:"normalUser"});
    await user.save();

    res.redirect("/login");

    let mailOptions = {
      from: "youremail@gmail.com",
      to: email,
      subject: "signup to our bookStore",
      text: "you signed up sucsessfuly!",
    };

    await transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

}

function getSignUp(req,res)
{

  let messageArr = req.flash("error");
  let error = null;
  if (messageArr.length > 0) {
    error = messageArr[0];
  }
    res.render("auth/signup.ejs",{isloggedIn:false,error:error});
}

function getResetPassword(req, res) {
  let messageArr = req.flash("error");
  let error = null;

  if (messageArr.length > 0) {
    error = messageArr[0];
  }
  res.render("auth/resetPassword", { isloggedIn: false,error:error });
}

async function postResetPassword(req,res)
{
  let {email} =req.body;
  let buffer= await crypto.randomBytes(32);
  let token=await buffer.toString("hex");

  let user=await User.findOne({email:email});
  if(!user)
  {
    req.flash("error","no email found");
    return res.redirect("/resetPassword");
  }
  user.resetToken=token;
  user.tokenExpirationDate=Date.now()+3600000;
  await user.save()

  res.redirect("/");

    let mailOptions = {
      from: "youremail@gmail.com",
      to: email,
      subject: "reseting your password",
      html: ` <h1>here is a <span><a href="http://localhost:3000/resetPassword/${token}"> Link </a> </span> to reset password</h1>  `,
    };

    await transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

}


async function getNewPassword(req,res)
{
  let {token}=req.params;
  let validUser=await User.findOne({resetToken:token,tokenExpirationDate:{$gt:Date.now()}});
  if(validUser)
  {

    res.render("auth/newPassword.ejs", {userId:validUser._id.toString(), isloggedIn: false });
  }
  else
  {
    res.redirect("/login");
  }

}


async function psotNewPassword(req,res)
{
  let { userId, password } = req.body;
  let user=await User.findOne({_id:userId});

  let hashedPasswor=await bcrypt.hash(password,12);
  user.password=hashedPasswor;
  user.resetToken=undefined;
  user.tokenExpirationDate=undefined;
  await user.save();

  res.redirect("/login");
  
    let mailOptions = {
      from: "youremail@gmail.com",
      to: user.email,
      subject: "reseting your password",
      html: ` <h1> succesfully updated your password </h1>`,
    };

    await transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });



}



export{getLogin,postLogin,postLogOut,getSignUp,postSignUp,getResetPassword,postResetPassword,getNewPassword,psotNewPassword};