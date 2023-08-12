export const isAuth = (req,res,next) => {
    console.log(req.isAuthenticated());
    if(req.session.email) return next();
    else res.redirect('/login?logout=e');
}


// Codigo a continuacion no funciona con google auth

// export const isAuth = (req,res,next) => {
   
//     if(req.isAuthenticated()) return next();
//     else res.redirect('/login?logout=e');
// }