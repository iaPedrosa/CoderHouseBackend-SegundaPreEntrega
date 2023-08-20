export const hasLoggin = (req, res, next) => {

    if(!req.user) next();
    else res.redirect('/products/?status=true&sort=asc');
};



