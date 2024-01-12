function getErrorPage(req,res)
{
  res.status(404).render("404.ejs",{isloggedIn:false});
}

export default getErrorPage