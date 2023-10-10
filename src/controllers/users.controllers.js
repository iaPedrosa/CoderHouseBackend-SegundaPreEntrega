import factory from "../persistence/daos/factory.js";
import { generateToken } from "../jwt/auth.js";
import UserService from "../services/user.services.js";
import * as serviceCart from "../services/cart.services.js";
const { userDao } = factory;
const userService = new UserService();
import { HttpResponse } from '../middlewares/http.response.js'
const httpResponse = new HttpResponse();


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
      else return httpResponse.Ok(res, premiumUser);
    }
  } catch (error) {
    httpResponse.ServerError(res, 'Error al actualizar el usuario');
  }
}