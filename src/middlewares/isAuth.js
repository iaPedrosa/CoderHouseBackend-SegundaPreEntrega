export const isAuth = (req,res,next) => {
    console.log(req);
    if(req.isAuthenticated()) return next();
    else res.redirect('/login?logout=e');
}