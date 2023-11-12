import { UserModel } from "./models/user.model.js";
import { createHash, isValidPassword } from "../../../utils.js"
import {logger} from '../../../utils.js'
import jwt from 'jsonwebtoken';
import { log } from "console";

const SECRET_KEY = process.env.SECRET_KEY_JWT;

export default class UserDaoMongoDB {
    async register(user) {
        try {
            const { email,password } = user;
            const existUser = await UserModel.findOne({ email });
            if(!existUser) {
                if(email === 'adminCoder@coder.com' && password === 'adminCod3r123'){
                    logger.warn('Usuario admin creado')
                    
                    const newUser = await UserModel.create({...user, password: createHash(password) , role: 'admin'});
                    return newUser;
                }
                return await UserModel.create({
                    ...user,
                    password: createHash(password)
                });
            } else return false;
        } catch (error) {
            console.log(error);
        }
    };

    async loginUser(user) {
        try {
            const { email, password } = user;
            
            const userExist = await UserModel.findOne({ email: { $regex: new RegExp(email, 'i') } });
            if(userExist) {
                const passValid = isValidPassword(password, userExist);
                if(!passValid) return false;
                else{ 
                  //Restamos 3hs por el horario del servidor.
                  const threeHoursAgo = new Date(Date.now() - 3 * 60 * 60 * 1000);
                  await UserModel.updateOne({_id: userExist._id}, {lastConecction: threeHoursAgo}); 
                  return userExist;
                }
            }
            else return false;
           
        } catch (error) {
            console.log(error);
        }
    };

    async infoUser(email) {
        try {
            
            const user = await UserModel.findOne({ email: { $regex: new RegExp(email, 'i') } });
            return user;
        } catch (error) {
            console.log(error);
            
        }

    }

    async getById(id){
        try {
          const userExist = await UserModel.findById(id)
          if(userExist) return userExist
          else return false
        } catch (error) {
          console.log(error)
          // throw new Error(error)
        }
      }
    
      async getByEmail(email){
        try {
          const userExist = await UserModel.findOne({ email: { $regex: new RegExp(email, 'i') } });
          
          if(userExist) return userExist
          else return false
        } catch (error) {
          console.log(error)
          throw new Error(error)
        }
      }

      async premium(user) {
        try {
          const {id} = user;
          const userExist = await UserModel.findById(id);
          //si es user lo pasamos a premium, si es premium lo pasamos a user
          if(userExist && userExist.role === 'user') {
            const updateUser = await UserModel.findByIdAndUpdate(id, {role: 'premium'}, {new: true});
            return updateUser;
            } else if(userExist && userExist.role === 'premium') {
              const updateUser = await UserModel.findByIdAndUpdate(id, {role: 'user'}, {new: true});
              return updateUser;
            } else return false;


        } catch (error) {
          console.log(error);
        }
      }

      generateToken(user, timeExp) {
        const payload = {
          userId: user._id
        };
        const token = jwt.sign(payload, SECRET_KEY, {
          expiresIn: timeExp,
        });
        return token;
      }


      async resetPass(user){
        try {
         
         const userExist = await this.getByEmail(user);
         
         if(!userExist) return false; 
         return this.generateToken(userExist, '1h');
        } catch (error) {
          throw new Error(error.message);
        }
      };

      async updatePass(user, pass){
        try {
     
          const isEqual = isValidPassword(pass, user);
          if(isEqual) return false;
          const newPass = createHash(pass);
          await UserModel.updateOne({_id: user._id}, {password: newPass});
          return true;
        } catch (error) {
          throw new Error(error.message);
        }
      }
    

      async update(user){
        try {
          const userExist = await UserModel.findById(user._id);
          if(!userExist) return false;
          const updateUser = await UserModel.updateOne({_id: user._id}, user);
          return updateUser;
        } catch (error) {
          throw new Error(error.message);
        }
      }

    async updateTimeLoggin(user){
      try {
        const {id} = user;
        const userExist = await UserModel.findById(id);
        if(userExist){
          const threeHoursAgo = new Date(Date.now() - 3 * 60 * 60 * 1000);
          await UserModel.updateOne({_id: userExist._id}, {lastConecction: threeHoursAgo}); 
          return true;
        } else return false;
      } catch (error) {
        throw new Error(error.message);
      }

    }
}