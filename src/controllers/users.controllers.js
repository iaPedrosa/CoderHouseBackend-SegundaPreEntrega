import UserDao from "../daos/mongodb/user.dao.js"
const userDao = new UserDao();


export const  registerResponse = async(req, res) => {
  try {
    const user = await userDao.getByEmail(req.body.email);
    req.session.email = user.email;
    res.redirect('/products');
   
} catch (error) {
    console.log(error);
}
};



  export const loginResponse = async(req, res, next)=>{
    try {
      const user = await userDao.getById(req.session.passport.user);
      req.session.email = user.email;
      res.redirect('/products');
    } catch (error) {
      next(error.message)
    }
  }  

  export const logoutUser = (req, res, next)=>{
    try {
        req.logout();
        res.json({
            msg: 'Logout ok',
        })
        
    } catch (error) {
        next(error.message)
        
    }

    }
