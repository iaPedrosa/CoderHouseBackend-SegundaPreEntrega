export const isAuth = (req,res,next) => {
    if(req.isAuthenticated()) return next();
    else res.redirect('/login?logout=e');
}