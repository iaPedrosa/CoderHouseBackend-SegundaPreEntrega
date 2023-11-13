import factory from "../persistence/daos/factory.js";
import { generateToken } from "../jwt/auth.js";
import { PRIVATE_KEY } from "../jwt/auth.js";
import UserService from "../services/user.services.js";
import * as serviceCart from "../services/cart.services.js";
const { userDao } = factory;
const userService = new UserService();
import { HttpResponse } from '../middlewares/http.response.js'
const httpResponse = new HttpResponse();
import UserRepository from "../persistence/repository/user/user.repository.js"
const userRepository = new UserRepository();
import jwt from "jsonwebtoken";

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

export const registerJWT = async(req, res, next)=>{
  try {
    const newUser = await userService.register(req.body);
    if(!newUser) res.redirect('/register?error=e');
    else {
    const access_token = generateToken(newUser);

    
    await serviceCart.createCart(newUser.email);
   
    
    const maxAge = 20 * 60 * 1000;

        res.cookie("Authorization", access_token, {
            maxAge,
            httpOnly: true
        });
        res.redirect('/products');
    }
  } catch (error) {
    res.redirect('/register?error=e');
  }
};


export const loginJWT = async(req, res, next)=>{
  try {

    const token = await userService.login(req.body);
    const maxAge = 20 * 60 * 1000;

        res.cookie("Authorization", token, {
            maxAge,
            httpOnly: true
        });
        res.redirect('/products');
  } catch (error) {
    res.redirect('/login?error=e');
  }
};


export const APIloginJWT = async(req, res, next)=>{
  try {

    const token = await userService.login(req.body);
    const maxAge = 20 * 60 * 1000;

        res.cookie("Authorization", token, {
            maxAge,
            httpOnly: true
        });
        res.json({
          msg: 'Login ok'
        });
        
  } catch (error) {
    res.json({
      msg: 'Login error',
      error: error.message
    });
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


   
        
export const premium = async(req, res, next)=>{
  try {
    const {id} = req.params;
    const user = await userDao.getById(id);
    if(!user)  httpResponse.NotFound(res, 'No existe el usuario');

    else {
      const premiumUser = await userService.premium(user);
      if(!premiumUser) httpResponse.ServerError(res, 'Error al actualizar el usuario');

 
     
      
      else{ 
        const userActualizado = await userRepository.getByIdDTO(id);
         return httpResponse.Ok(res, userActualizado);
        }
    }
  } catch (error) {
    httpResponse.ServerError(res, 'Error al actualizar el usuario');
  }
}

export const resetPass = async(req, res, next)=>{
  try {
    const {email} = req.body;
    const user = await userDao.getByEmail(email);
    if(!user)  res.redirect('/resetpass?error=e');

    else {
      const tokenResetPass = await userService.resetPass(email);
      
      if(!tokenResetPass) res.redirect('/resetpass?err=e');
      else{
      
      return res.redirect('/resetpass?ok=e');
    }
     
      
     
    }
  } catch (error) {
    res.redirect('/resetpass?err=e');
  }
}

export const getUsers = async(req, res, next)=>{
  try {
    const users = await userRepository.getAllDTO();
    if(!users) httpResponse.NotFound(res, 'No hay usuarios');
    else httpResponse.Ok(res, users);
  } catch (error) {
    httpResponse.ServerError(res, 'Error al obtener los usuarios');
  }
}

export const deleteOldUsers = async(req, res, next)=>{
  try {
    const users = await userRepository.deleteOldUsers();
    if(!users) httpResponse.NotFound(res, 'No hay usuarios');
    else httpResponse.Ok(res, users);
  } catch (error) {
    httpResponse.ServerError(res, 'Error al obtener los usuarios');
  }
} 

export const updatePass = async (req, res, next) => {
  try {
    const { pass } = req.body;
    const { tok } = req.params;

    let decode;
    try {
      const authHeader = tok;
      decode = jwt.verify(authHeader, PRIVATE_KEY);
    } catch (error) {
      return res.redirect('/resetpass?vencido=e');
    }

    const user = await userDao.getById(decode.userId);

    if (!tok) return res.redirect('/resetpass?err=e');
    const updPass = await userService.updatePass(user, pass);
    if (!updPass) return res.redirect('/resetpass?err=e');

    return res.redirect('/login?newpass=e');
  } catch (error) {
    next(error.message);
  }
};