import factory from "../persistence/daos/factory.js";
const { userDao } = factory;
import { HttpResponse } from '../middlewares/http.response.js'
const httpResponse = new HttpResponse();


import jwt from "jsonwebtoken";
import { PRIVATE_KEY } from "../jwt/auth.js";

export const checkAuth = async (req, res, next) => {
  try {

    const authHeader = req.cookies.Authorization
    if (!authHeader) return res.redirect('/login?logout=e');
    
    try {
      const decode = jwt.verify(authHeader, PRIVATE_KEY);
      const user = await userDao.getById(decode.userId);
    
    if (!user) httpResponse.Unauthorized(res, 'No autorizado')
    req.user = user;
    next();
    } catch (error) {
      res.clearCookie('Authorization');
      res.redirect('/login');
    }
    
    
  } catch (error) {
    next(error.message);
  }
};
