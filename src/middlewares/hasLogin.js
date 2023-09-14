export const hasLoggin = (req, res, next) => {


    const authHeader = req.cookies.Authorization
    if(!authHeader) next();
    else res.redirect('/products/?status=true&sort=asc');
};
