import factory from "../persistence/daos/factory.js";
const { userDao } = factory;
import { HttpResponse } from '../middlewares/http.response.js'
const httpResponse = new HttpResponse();


import jwt from "jsonwebtoken";
import { PRIVATE_KEY } from "../jwt/auth.js";

export const isAdmin = async (req, res, next) => {
  try {
    const authHeader = req.cookies.Authorization;

    if (!authHeader) {
  
      return httpResponse.Unauthorized(res, 'Unauthorized')
    }

    const decode = jwt.verify(authHeader, PRIVATE_KEY);
    const user = await userDao.getById(decode.userId);

    if (user.role !== 'admin') {
      return httpResponse.Unauthorized(res, 'Unauthorized')
    }

    next();
  } catch (error) {
    next(error.message);
  }
};