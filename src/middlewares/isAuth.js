export const isAuth = (req,res,next) => {
    
    if(req.session.email) return next();
    else res.redirect('/login?logout=e');
}