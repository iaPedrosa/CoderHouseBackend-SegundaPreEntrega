import factory from "../../daos/factory.js";
const { userDao } = factory;
import UserResDTO from "../../dto/user/user.res.dto.js"


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

}