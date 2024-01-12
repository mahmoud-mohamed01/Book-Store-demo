export default function(req,res,next)
{
    if (req.user.userType !="admin")
    {
      return res.redirect("/");
    }
    next();
}