import UserDao from "../daos/mongodb/user.dao.js"
import { generateToken } from "../jwt/auth.js";
const userDao = new UserDao();


export const  registerResponse = async(req, res) => {
  try {
    const {email} = req.user;
    req.session.email = email;
    const access_token = generateToken(req.user);
    res.cookie("Authorization", access_token)
    res.redirect('/products');
   
} catch (error) {
    console.log(error);
}
};



  export const loginResponse = async(req, res, next)=>{
    try {
      const user = await userDao.getById(req.session.passport.user);
      
      req.session.email = user.email;
      const access_token = generateToken(user);
      res.cookie("Authorization", access_token)
      res.redirect('/products');
    } catch (error) {
      next(error.message)
    }
  }  

  export const logoutUser = (req, res, next)=>{
    try {
      
        req.session.destroy();
        res.clearCookie('Authorization');
        res.json({
            msg: 'Logout ok',
        })
        
    } catch (error) {
        next(error.message)
        
    }

    }

