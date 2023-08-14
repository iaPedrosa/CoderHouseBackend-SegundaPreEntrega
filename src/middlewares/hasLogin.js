export const hasLoggin = (req, res, next) => {

    if(!req.user) next();
    else res.redirect('/products');
};



// import UserDao from '../daos/mongodb/user.dao.js';
// const userDao = new UserDao();
// import jwt from "jsonwebtoken";
// import { PRIVATE_KEY } from "../jwt/auth.js";

// export const hasLoggin = async (req, res, next) => {
//   try {
//     const authHeader = req.cookies.Authorization
//     if (!authHeader) next();
    
//     const decode = jwt.verify(authHeader, PRIVATE_KEY);
//     const user = await userDao.getById(decode.userId);
//     if (!user) res.status(401).json({ msg: "Unauthorized" });
//     req.user = user;
//     res.redirect('/products');
//   } catch (error) {
//     next(error.message);
//   }
// };
