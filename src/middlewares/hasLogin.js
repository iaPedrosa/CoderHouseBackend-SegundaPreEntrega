export const hasLoggin = (req, res, next) => {
    if(!req.session.email) next();
    else res.redirect('/products');
};