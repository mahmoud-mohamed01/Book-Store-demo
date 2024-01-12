
export default function(req,res,next)
{
 if (!req.session.isloggedIn) {
   return res.redirect("/login");
 }
 
 next();
}