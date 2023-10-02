import { UserModel } from "./models/user.model.js";
import { createHash, isValidPassword } from "../../../utils.js";

export default class UserDaoMySQL {
    async register(user) {
        try {
            const { email, password } = user;
            const existUser = await UserModel.findOne({ where: { email: email } });

            if (!existUser) {
                if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
                    console.log('Usuario admin creado');
                    const newUser = await UserModel.create({
                        ...user,
                        password: createHash(password),
                        role: 'admin'
                    });
                    return newUser;
                } else {
                    return await UserModel.create({
                        ...user,
                        password: createHash(password)
                    });
                }
            } else {
                return false;
            }
        } catch (error) {
            console.log(error);
        }
    };

    async loginUser(user) {
        try {
            const { email, password } = user;
            

            const userExist = await UserModel.findOne({ where: { email: email } });
            
            if (userExist) {
                
                const passValid = isValidPassword(password, userExist);
                
                if (!passValid) return false;
                else return userExist;
            } else {
                return false;
            }

        } catch (error) {
            console.log(error);
        }
    };

    async infoUser(email) {
        try {
            const user = await UserModel.findOne({ where: { email: email } });
            return user;
        } catch (error) {
            console.log(error);
        }
    }

    async getById(id) {
        try {
            const userExist = await UserModel.findByPk(id);
            if (userExist) return userExist;
            else return false;
        } catch (error) {
            console.log(error);
        }
    }

    async getByEmail(email) {
        try {
            const userExist = await UserModel.findOne({ where: { email: email } });
            if (userExist) return userExist;
            else return false;
        } catch (error) {
            console.log(error);
        }
    }
}
