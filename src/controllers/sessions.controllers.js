import factory from "../persistence/daos/factory.js";
import { generateToken } from "../jwt/auth.js";
const {userDao} = factory;
import jwt from "jsonwebtoken";
import { PRIVATE_KEY } from "../jwt/auth.js";
import UserRepository from "../persistence/repository/user/user.repository.js"
const userRepository = new UserRepository();
import { HttpResponse } from '../middlewares/http.response.js'
const httpResponse = new HttpResponse();



export const current = async (req, res, next) => {
  try {

    
    const authHeader = req.cookies.Authorization

    if (!authHeader) {

    
      httpResponse.NotFound(res, 'No user logged')

      
      return;
    }
    const decode = jwt.verify(authHeader, PRIVATE_KEY);
    
    const user = await userRepository.getByIdDTO(decode.userId);
    if (!user) {
      httpResponse.NotFound(res, 'No ')
      
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


export const userLogged = async(req, res, next) => {
  try {
    const authHeader = req.cookies.Authorization
    if (!authHeader) {
      httpResponse.NotFound(res, 'No user logged')
      return;
    }
    const decode = jwt.verify(authHeader, PRIVATE_KEY);
    const user = await userRepository.getByIdDTO(decode.userId);
    if (!user) {
      httpResponse.NotFound(res, 'No user logged')
      return;

      
    }
   return user;
  } catch (error) {
    next(error);
  }
}





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

