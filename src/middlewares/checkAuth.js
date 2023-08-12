import UserDao from '../daos/mongodb/user.dao.js';
const userDao = new UserDao();
import jwt from "jsonwebtoken";
import { PRIVATE_KEY } from "../jwt/auth.js";

export const checkAuth = async (req, res, next) => {
  try {
    const authHeader = req.cookies.Authorization
    if (!authHeader) res.redirect('/login?logout=e');
    
    const decode = jwt.verify(authHeader, PRIVATE_KEY);
    const user = await userDao.getById(decode.userId);
    if (!user) res.status(401).json({ msg: "Unauthorized" });
    req.session.email = user.email;
    req.user = user;
    next();
  } catch (error) {
    next(error.message);
  }
};
