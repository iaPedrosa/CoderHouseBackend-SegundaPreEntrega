import UserDao from "../daos/mongodb/user.dao.js"
import { generateToken } from "../jwt/auth.js";
const userDao = new UserDao();



export const current = async (req, res, next) => {
  try {

    if (!req.user) {

      res.status(404).json({ error: "No user logged" });

      
      return;
    }
    const user = await userDao.getById(req.user._id);
    if (!user) {
      res.status(404).json({ error: "not found" });
      return;
    }
    res.json(user);
  } catch (error) {
    next(error);
  } 
}




export const  registerResponse = async(req, res) => {
  try {
    const access_token = generateToken(req.user);
    res.cookie("Authorization", access_token)
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

