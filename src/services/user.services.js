import UserDao from "../daos/mongodb/user.dao.js";
const userDao = new UserDao();
import fs from 'fs';
import {__dirname} from '../utils.js';

export const userInfo = async (user) => {
    
    const userExist = await userDao.infoUser(user);
    
    return userExist;
}