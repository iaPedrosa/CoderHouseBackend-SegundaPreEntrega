import Services from "./class.services.js";
import pkg from 'jsonwebtoken';
const { sign } = pkg;
import 'dotenv/config';
import factory from "../persistence/daos/factory.js";
import {logger} from '../utils.js'
import { sendMail } from "./email.service.js";
const { userDao } = factory;

const SECRET_KEY = process.env.SECRET_KEY_JWT;

export default class UserService extends Services {
  constructor() {
    super(userDao);
  }

  #generateToken(user) {
    const payload = {
      userId: user.id,
    };
    return sign(payload, SECRET_KEY, { expiresIn: '20m' });
  };

  async register(user) {
    try {
      return await userDao.register(user);
    } catch (error) {
      logger.error(error)
    }
  };

  async login(user) {
    try {
      const userExist = await userDao.loginUser(user);
      
      if(userExist) return this.#generateToken(userExist);
      else throw new Error('User not found');
    } catch (error) {
      throw error;
      
    }
  };

  async getUser() {
    try {
      return await userDao.getUser();
    } catch (error) {
      logger.error(error)
    }

  }

  async premium(user) {
    try {
      return await userDao.premium(user);
    } catch (error) {
      logger.error(error)
    }
  }

  async resetPass(user) {
    try {
      const token = await userDao.resetPass(user);
      

      if(!token) return false;
      return await sendMail(user, 'resetPass', token);
    } catch (error) {
      logger.error(error)
    }
  }

  async updatePass(user, pass){
    try {
      return await userDao.updatePass(user, pass);
    } catch (error) {
      throw new Error(error.message);
    }
  }

}
