

import factory from "../persistence/daos/factory.js";
const { userDao,prodDao } = factory;
import { HttpResponse } from '../middlewares/http.response.js'
const httpResponse = new HttpResponse();


import jwt from "jsonwebtoken";
import { PRIVATE_KEY } from "../jwt/auth.js";

export const canUpdateProduct = async (req, res, next) => {
  try {

    const { id } = req.params;
    const product = await prodDao.getById(id);

    const authHeader = req.cookies.Authorization;

    if (!authHeader) {
  
      return httpResponse.Unauthorized(res, 'Unauthorized')
    }

    const decode = jwt.verify(authHeader, PRIVATE_KEY);
    const user = await userDao.getById(decode.userId);


    if (user.role !== 'admin' && (user.role !== 'premium' || product.owner !== user.email )) {

      return httpResponse.Unauthorized(res, 'No puedes actualizar el producto. Debes ser admin o el dueño del producto')
    }

    next();
  } catch (error) {
    next(error.message);
  }
};