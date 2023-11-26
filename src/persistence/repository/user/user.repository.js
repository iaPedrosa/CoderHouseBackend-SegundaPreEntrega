import { deleteOldUsers } from "../../../controllers/users.controllers.js";
import factory from "../../daos/factory.js";
const { userDao } = factory;
import UserResDTO from "../../dto/user/user.res.dto.js"
import UserResDTOAdmin from "../../dto/user/userAdmin.res.dto.js"



export default class ProductRepository {
    constructor(){
        this.dao = userDao;
    }

    async getByIdDTO(id){
        try {
            const response = await this.dao.getById(id);
            return new UserResDTO(response);
        } catch (error) {
            console.log(error);
        }
    }

    async getByIdDTOAdmin(id){
        try {
            const response = await this.dao.getById(id);
            return new UserResDTOAdmin(response);
        } catch (error) {
            console.log(error);
        }
    }
    

    async getAllDTO(){
        try {
            const response = await this.dao.getAll();
            return response.map(user => new UserResDTO(user));
        } catch (error) {
            console.log(error);
        }
    }


    async deleteOldUsers(){
        try {
            const response= await this.dao.deleteOldUsers();
            

            


            return response;
        } catch (error) {
            console.log(error);
        }
    }

}