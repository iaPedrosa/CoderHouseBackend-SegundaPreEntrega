import UserDao from "../daos/mongodb/user.dao.js"
import { generateToken } from "../jwt/auth.js";
const userDao = new UserDao();


export const  registerResponse = async(req, res) => {
  try {
    const access_token = generateToken(req.user);
    const maxAge = 20 * 60 * 1000;

        res.cookie("Authorization", access_token, {
            maxAge,
            httpOnly: true
        });
    res.redirect('/products');
   
} catch (error) {
    console.log(error);
}
};



  export const loginResponse = async(req, res, next)=>{
    try {

      const access_token = generateToken(req.user);   
      res.cookie("Authorization", access_token)
      res.redirect('/products');
    } catch (error) {
      next(error.message)
    }
  }  

  export const logoutUser = (req, res, next)=>{
    try {
         
        res.clearCookie('Authorization');
        res.json({
            msg: 'Logout ok',
        })
        
    } catch (error) {
        next(error.message)
        
    }

    }

